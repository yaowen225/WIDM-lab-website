#!/bin/bash

# 檢查 Docker 是否已安裝
if ! command -v docker &> /dev/null
then
    echo "Docker could not be found. Please install Docker first."
    exit 1
fi

# 建立 Docker 映像檔
echo "Building Docker image..."
docker build -t widm-front-end .
docker rm -f widm-front-end || true

# 檢查操作系統並選擇合適的命令來運行 Docker 容器
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Running on Unix/Linux..."
    docker run -d -p 7230:7230 -p 24678:24678 -v "$(pwd)":/usr/src/app --name widm-front-end widm-front-end
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Running on MacOS..."
    docker run -d -p 7230:7230 -p 24678:24678 -v "$(pwd)":/usr/src/app --name widm-front-end widm-front-end
elif [[ "$OSTYPE" == "msys"* ]] || [[ "$OSTYPE" == "win32" ]]; then
    echo "Running on Windows Git Bash..."
    docker run -d -p 7230:7230 -p 24678:24678 -v ${PWD}:/usr/src/app --name widm-front-end widm-front-end
else
    echo "Unsupported OS. Please run the Docker commands manually."
    exit 1
fi

echo "Docker container is running."



# chmod +x run_docker.sh
# ./run_docker.sh

