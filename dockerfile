FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV AWS_SDK_LOAD_CONFIG=1
COPY . .

