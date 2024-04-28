FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npx", "nodemon", "--exec", "ts-node", "./server/server.ts"]
