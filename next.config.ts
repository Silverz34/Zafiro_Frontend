import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: Permite a Clerk y Cloudflare operar.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://challenges.cloudflare.com",
              // Imágenes: Se agregó googleusercontent para permitir los avatares de Google
              "img-src 'self' data: blob: https://*.clerk.com https://*.cloudflare.com https://img.clerk.com https://*.googleusercontent.com",
              // Worker Fundamental para que los procesos en segundo plano de Clerk no se bloqueen
              "worker-src 'self' blob:",
              // Frames: Se eliminó el dominio inválido
              "frame-src 'self' https://challenges.cloudflare.com https://*.clerk.accounts.dev",
              // Conexiones: Se eliminó el dominio inválido
              "connect-src 'self' https://*.clerk.com https://*.clerk.accounts.dev https://*.googleapis.com",
              // Estilos
              "style-src 'self' 'unsafe-inline'",
              // Fuentes
              "font-src 'self' data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;