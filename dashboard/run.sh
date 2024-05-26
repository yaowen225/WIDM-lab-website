#!/bin/bash
# sudo kill -9 $(sudo lsof -i :7230 | grep LISTEN | awk '{print $2}')
# npm start

docker rm -f widm-front-end || true
docker build -t widm-front-end .
docker run -d -p 7230:7230 -p 24678:24678 -v ${PWD}:/usr/src/app --name widm-front-end widm-front-end

# chmod +x run_docker.sh
# ./run_docker.sh

# openapi-generator-cli generate -i swagger.json -g typescript-axios -o ./domain/api-client -t ./domain/custom-templates/typescript --additional-properties=usePromises=true

