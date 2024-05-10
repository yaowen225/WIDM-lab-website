# 選擇 node:20 作為基礎映像檔
FROM node:20

# 設定工作目錄
WORKDIR /app

# 複製當前目錄下的所有檔案到工作目錄
COPY . .

# 安裝 nvm 並安裝所需的 Node.js 版本
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install --lts

# 安裝 Node.js 專案的依賴項
RUN npm install

# 啟動 Node.js 應用程式
CMD ["npm", "start"]
