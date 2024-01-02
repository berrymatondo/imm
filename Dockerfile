#FROM node:18-alpine
#RUN mkdir -p /app
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm run build
#EXPOSE 3000
#CMD ["npm", "start"]

# Stage 1: install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json .
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install --loglevel verbose

# Stage 2: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY public ./public
COPY package.json next.config.js tsconfig.json ./
RUN npm run build

# Stage 3: run
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["npm", "run", "start"]