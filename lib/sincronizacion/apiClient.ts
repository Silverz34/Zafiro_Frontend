'use server'
import { auth } from '@clerk/nextjs/server'
import { ApiError } from './apiError';

const BASE = process.env.API_URL;

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}


async function builheaders(): Promise<HeadersInit> {
  const { getToken } = await auth();
  const token = await getToken()
  if (!token) {
    throw new ApiError(401, 'sin sesion activa - token no disponible')
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

async function buildAlgorithmHeaders(data: string): Promise<HeadersInit> {
  const { getToken } = await auth();
  const token = await getToken()
  if (!token) {
    throw new ApiError(401, 'sin sesion activa - token no disponible')
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'payload': `${data}`
  }
}

async function algorithmRequest<T>(data: any){
  const headers = await buildAlgorithmHeaders(data)
  const res = await fetch(new URL('/api/algorithm/sort', BASE).toString(), {
    method:'POST',
    headers:headers,
    cache:'no-store'
  })
  let response
  try {
    response = res.headers.get('x-algoritmo-result')
  } catch {
    throw new ApiError(res.status, `Error ${res.status}: La respuesta no se obtuvo correctamente`)
  }

  let json: ApiResponse<T>
  try {
    json = await res.json()
    json.data = response as T
  } catch {
    throw new ApiError(res.status, `Error ${res.status}: respuesta no es json`)
  }
  if (!res.ok) {
    throw new ApiError(res.status, json.message ?? `Error ${res.status}, ${json.message}`)
  }

  return json
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  const headers = await builheaders();
  const res = await fetch(new URL(path, BASE).toString(), {
    method,
    headers,
    ...(body !== undefined && { body: JSON.stringify(body) }),
    cache: 'no-store',
  })
  if (res.status === 204) {
    return { success: true, data: undefined as T }
  }

  let json: ApiResponse<T>
  try {
    json = await res.json()
  } catch {
    throw new ApiError(res.status, `Error ${res.status}: respuesta no es json`)
  }
  if (!res.ok) {
    throw new ApiError(res.status, json.message ?? `Error ${res.status}, ${json.message}`)
  }

  return json

}

//importacion de los metodos para el CRUD de actividad 
export async function apiGet<T>(path: string): Promise<ApiResponse<T>> {
  return request<T>('GET', path)
}

export async function apiPost<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  return request<T>('POST', path, body)
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  return request<T>('PATCH', path, body)
}

export async function apiDelete<T>(path: string): Promise<ApiResponse<T>> {
  return request<T>('DELETE', path)
}

export async function algorithmPost<T>(data:any): Promise<ApiResponse<T>> {
  return algorithmRequest<T>(data)
}