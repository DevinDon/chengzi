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
  echo "推送 Index 镜像"
  docker push --all-tags ${IMAGE_INDEX}
fi

if [ -d "dist/apps/customer-service" ]; then
  echo "推送 Customer Service 镜像"
  docker push --all-tags ${IMAGE_CS}
fi

if [ -d "dist/apps/order-formatter" ]; then
  echo "推送 Order Formatter 镜像"
  docker push --all-tags ${IMAGE_OF}
fi
