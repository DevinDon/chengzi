#!/usr/bin/env bash
set -e

docker login \
  --username=${ALIYUN_USERNAME} \
  --password=${ALIYUN_PASSWORD} \
  ${ALIYUN_REGISTRY}

IMAGE_INDEX=${ALIYUN_REGISTRY}/iinfinity/chengzi-tools-index
IMAGE_CS=${ALIYUN_REGISTRY}/iinfinity/chengzi-tools-customer-service
IMAGE_OF=${ALIYUN_REGISTRY}/iinfinity/chengzi-tools-order-formatter

cd ${BUILD_DIR} && tar zxvf package.tgz

if [ -d "dist/apps/index" ]; then
  echo "构建 Index 镜像"
  docker build \
    -t ${IMAGE_INDEX}:${DATETIME} \
    -t ${IMAGE_INDEX}:latest \
    -f apps/index/Dockerfile \
    .
fi

if [ -d "dist/apps/customer-service" ]; then
  echo "构建 Customer Service 镜像"
  docker build \
    -t ${IMAGE_CS}:${DATETIME} \
    -t ${IMAGE_CS}:latest \
    -f apps/customer-service/Dockerfile \
    .
fi

if [ -d "dist/apps/order-formatter" ]; then
  echo "构建 Order Formatter 镜像"
  docker build \
    -t ${IMAGE_OF}:${DATETIME} \
    -t ${IMAGE_OF}:latest \
    -f apps/order-formatter/Dockerfile \
    .
fi
