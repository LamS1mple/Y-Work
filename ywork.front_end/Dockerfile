FROM node:17-alpine as build

WORKDIR /app

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.28.1-alpine-slim

COPY --from=build /app /usr/share/nginx/html

EXPOSE 80






