#!/usr/bin/env bash

set -e

DOCKER_IMAGE=xbtc_token-geyser_frontend
CONTAINER_NAME=xbtc_token-geyser_frontend

docker build -t $DOCKER_IMAGE -f docker/Dockerfile .

docker run -it \
    --rm \
    --name $CONTAINER_NAME \
    $DOCKER_IMAGE $@
#    --net host \
