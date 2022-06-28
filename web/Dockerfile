#stage 1
From node:latest as node
WORKDIR /app
copy . .
RUN npm install
RUN npm run build --prod

#stagepine 2
FROM nginx:alpine
COPY --from=node /app/dist/estock /usr/share/nginx/html
