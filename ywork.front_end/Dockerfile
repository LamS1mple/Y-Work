FROM node:17-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:1.28.1-alpine-slim

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80






