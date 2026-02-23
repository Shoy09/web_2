# Etapa de build: compila Angular en producción
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN ./node_modules/.bin/ng build --configuration production

# Etapa de runtime: sirve estáticos con Nginx y proxy /api al backend
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/seminco_web_2/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
