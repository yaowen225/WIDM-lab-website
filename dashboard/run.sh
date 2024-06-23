#!/bin/bash
# sudo kill -9 $(sudo lsof -i :5173 | grep LISTEN | awk '{print $2}')
# npm start

docker rm -f widm-dashboard-end || true
docker build -t widm-dashboard-end .
docker run -d -p 5173:5173 -v ${PWD}:/usr/src/app --name widm-dashboard-end widm-dashboard-end

docker build -t dashboard . 
docker run -p 5173:5173 dashboard

# chmod +x run_docker.sh
# ./run_docker.sh

# openapi-generator-cli generate -i swagger.json -g typescript-axios -o ./domain/api-client -t ./domain/custom-templates/typescript --additional-properties=usePromises=true

