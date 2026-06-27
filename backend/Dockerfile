FROM node:22-alpine AS builder

# Dependencias del sistema necesarias para Prisma
RUN apk add --no-cache openssl libc6-compat

# Activar pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Instalar todas las dependencias (incluye prisma CLI)
COPY package.json pnpm-lock.yaml* ./

# Autorizar explícitamente los scripts de build de Prisma para evitar el error ERR_PNPM_IGNORED_BUILDS
RUN pnpm config set allowed-build-from "@prisma/client,prisma,@prisma/engines"

# Ahora el install correrá sin problemas de bloqueo interactivo
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
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copiar artefactos compilados y el cliente Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Copiar node_modules desde builder para incluir prisma CLI y binarios necesarios
COPY --from=builder /app/node_modules ./node_modules

# Copiar carpeta de scripts para la creacion del admin
COPY --from=builder /app/scripts ./scripts

# Copiar package.json para comandos de inicio si es necesario
COPY --from=builder /app/package.json ./package.json

# Copiar tsconfig.json para usar ts-node
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 4000

# Sincronizar esquema, crear la base de datos si no existe, crear el administrador y luego arrancar la app.
CMD ["sh", "-c", "pnpm exec ts-node scripts/initdb.ts && pnpm prisma db push --accept-data-loss && pnpm exec ts-node scripts/createAdmin.ts && pnpm run start"]