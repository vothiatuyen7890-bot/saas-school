FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production || true
COPY . .
CMD ["node", "src/server.js"]
