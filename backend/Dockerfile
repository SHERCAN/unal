FROM node:22-alpine AS builder

# Dependencias del sistema necesarias para Prisma
RUN apk add --no-cache openssl libc6-compat

# Activar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Instalar todas las dependencias (incluye prisma CLI)
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copiar el código fuente y generar cliente prisma / build
COPY . .
RUN pnpm prisma generate
RUN pnpm run build

# Copiar videos al directorio de build
COPY src/public/videos ./dist/public/videos

# -------------------------------------------------
# RUNTIME: copiar sólo los artefactos necesarios
# -------------------------------------------------
FROM node:22-alpine AS runtime

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar artefactos compilados y el cliente Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Copiar node_modules desde builder para incluir prisma CLI y binarios necesarios
COPY --from=builder /app/node_modules ./node_modules

# Copiar package.json para comandos de inicio si es necesario
COPY --from=builder /app/package.json ./package.json

EXPOSE 4000

# Ejecutar migraciones y luego arrancar la app. Mantengo migraciones dentro del contenedor.
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm run start"]