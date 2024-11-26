FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

## how to use this file:
# docker build --no-cache -t hftamayo/reacttodo:0.0.1 .
# docker run -d --name reacttodo -p 8041:80 --env-file .env hftamayo/reacttodo:0.0.1