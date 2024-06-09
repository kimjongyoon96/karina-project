FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV AWS_SDK_LOAD_CONFIG=1
CMD ["npx", "nodemon", "--exec", "ts-node", "./server/server.ts"]
