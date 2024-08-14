# Birinchi qatorda qurish uchun Node tasviridan foydalanamiz
FROM --platform=linux/amd64 node:alpine AS builder
WORKDIR /app

# package.json va pnpm-lock.yaml fayllarini nusxalab olish
COPY package.json pnpm-lock.yaml ./

# Bog'liqliklarni o'rnatamiz
RUN npm install -g pnpm && pnpm install

# Kodni nusxalab olish va qurish
COPY . .
RUN pnpm run build

# Ishga tushirish uchun asosiy tasvir
FROM --platform=linux/amd64 node:alpine
WORKDIR /app

# Qurilgan kodni nusxalab olish
COPY --from=builder /app ./

# Portni ochamiz
EXPOSE 4000

# Ilovani ishga tushirish komandasi
CMD ["pnpm", "run", "start:prod"]
