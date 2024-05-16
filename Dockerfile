# 使用較輕量的 Node.js 版本
FROM alpine:3.18

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json 以利用 Docker 建置的快取
COPY package*.json ./

# 安裝 Node.js 專案的依賴項
RUN npm install --force

# 複製當前目錄下的所有檔案到工作目錄
COPY . .

# 曝露應用程式埠
EXPOSE 7230 24678

# 啟動 Node.js 應用程式
CMD ["npm", "start"]
