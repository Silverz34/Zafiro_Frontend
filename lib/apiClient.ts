'use server'
import {auth} from '@clerk/nextjs/server'
import { undefined } from 'zod';
const BASE = process.env.API_URL;

export interface ApiResponse<T>{
    success: boolean
    message?: string 
    data: T
}


export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function builheaders(): Promise<HeadersInit>{
    const {getToken}= await auth();
    const token = await getToken()
    
    if(!token){
        throw new ApiError(401, 'sin sesion activa - token no disponible')
    }
    return{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

async function request<T>(
    method: string,
    path:string,
    body?: unknown
): Promise<ApiResponse<T>>{
    const headers= await builheaders();
    const res = await fetch( new URL(path, BASE).toString(),{
        method,
        headers,
        ...(body !== undefined && { body: JSON.stringify(body) }),
        cache: 'no-store',
    })
    if(res.status === 204){
        return {success: true, data: undefined as T}
    }
   
    let json: ApiResponse<T>
    try{
        json = await res.json()
    }catch{
        throw new ApiError(res.status, 'Error ${res.status}: respuesta no es json')
    }
     if (!res.ok) {
    throw new ApiError(res.status, json.message ?? `Error ${res.status}`)
  }
 
  return json

}

//importacion de los metodos para el CRUD de actividad 
export const apiGet = <T>(path: string) =>
  request<T>('GET', path)
 
export const apiPost = <T>(path: string, body: unknown) =>
  request<T>('POST', path, body)
 
export const apiPatch = <T>(path: string, body: unknown) =>
  request<T>('PATCH', path, body)
 
export const apiDelete = <T>(path: string) =>
  request<T>('DELETE', path)