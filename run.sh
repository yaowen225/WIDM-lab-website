#!/bin/bash
# sudo kill -9 $(sudo lsof -i :7230 | grep LISTEN | awk '{print $2}')

docker build -t widm-front-end .
docker run -d -p 7230:7230 -p 24678:24678 -v ${PWD}:/usr/src/app --name widm-front-end widm-front-end

# npm start

# chmod +x run_docker.sh
# ./run_docker.sh

# --legacy-peer-deps

# openapi-generator-cli generate -i swagger.json -g javascript -o ./api-client -t ./custom-templates/javascript --additional-properties=usePromises=true

