FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Instalar dependencias de build
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copiar resto del código y construir
COPY . .

# Pasar las variables de entorno para que Next.js pueda compilarlas en el cliente
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APIUNAL
ENV NEXT_PUBLIC_APIUNAL=$NEXT_PUBLIC_APIUNAL

RUN pnpm build
# FINAL RUNTIME IMAGE (solo deps de producción)
# -------------------------------------------------
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
# Instalar sólo dependencias de producción en esta etapa para copiar a runtime
RUN pnpm install --frozen-lockfile --prod

FROM node:22-alpine AS runtime
RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app
ENV NODE_ENV=production


# Copiar dependencias de producción desde la etapa `deps`
COPY --from=deps /app/node_modules ./node_modules

# Copiar artefactos compilados
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public

# Copiar package.json y pnpm-lock.yaml para que pnpm start funcione
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml* ./

EXPOSE 3000
CMD ["pnpm", "start"]
