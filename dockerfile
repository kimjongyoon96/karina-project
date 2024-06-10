FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x entrypoint.sh
EXPOSE 4000
EXPOSE 3001
ENV AWS_SDK_LOAD_CONFIG=1
CMD ["./entrypoint.sh"]
# CMD ["npx", "nodemon", "--exec", "ts-node", "./server/server.ts"]
