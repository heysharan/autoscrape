# -------- Stage 1: Build --------
FROM oven/bun:1 AS builder

WORKDIR /app

# Install OS deps for Prisma
RUN apt-get update && apt-get install -y openssl

# Copy package files
COPY package.json bun.lock* ./

# Install deps
RUN bun install

# Copy project files
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build Next.js
RUN bun run build


# -------- Stage 2: Run --------
FROM oven/bun:1 AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y openssl

# Copy built app from builder
COPY --from=builder /app ./

EXPOSE 3000

CMD ["bun", "run", "start"]