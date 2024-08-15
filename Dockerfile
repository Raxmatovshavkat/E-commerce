# Build stage
FROM --platform=linux/amd64 node:alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy application code and build
COPY . .
RUN pnpm run build

# Runtime stage
FROM --platform=linux/amd64 node:alpine
WORKDIR /app

# Copy built application from the build stage
COPY --from=builder /app ./

# Expose port
EXPOSE 4000

# Start the application
CMD ["pnpm", "run", "start:prod"]
