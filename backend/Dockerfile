# backend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --build-from-source

COPY . .

EXPOSE 8090

CMD ["npm", "start"]
