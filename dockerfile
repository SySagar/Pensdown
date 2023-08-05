# stage 1: build and compile the app
FROM node:19-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN npm install --force

COPY . .

RUN npm run build

# stage 2: Based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

WORKDIR /app

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]