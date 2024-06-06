# 베이스 이미지로 Node.js를 사용합니다.
FROM node:14

# 앱 디렉토리를 설정합니다.
WORKDIR /app

# 패키지 매니저의 패키지 리스트를 복사합니다.
COPY package*.json ./

# 의존성을 설치합니다.
RUN npm install

# 소스 파일을 복사합니다.
COPY . .



