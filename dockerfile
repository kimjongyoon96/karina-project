FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npx", "nodemon", "--exec", "node", "dist/server/server.js"]

