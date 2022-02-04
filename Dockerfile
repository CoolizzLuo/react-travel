# 第一個階段: 拉取node鏡像來打包React項目
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN npm run build

# 第二個階段: 創建並運行Ngnix伺服器，並且把打包好的文件複製貼上到伺服器文件中
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


