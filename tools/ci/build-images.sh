docker login \
  --username=${ALIYUN_USERNAME} \
  --password=${ALIYUN_PASSWORD} \
  ${ALIYUN_REGISTRY}

export IMAGE_INDEX=${ALIYUN_REGISTRY}/iinfinity/chengzi-tools-index
export IMAGE_CS=${ALIYUN_REGISTRY}/iinfinity/chengzi-tools-customer-service
export IMAGE_OF=${ALIYUN_REGISTRY}/iinfinity/chengzi-tools-order-formatter

cd ${package_download_path} && tar zxvf package.tgz

if [ -d "dist/apps/index" ]; then
  echo "构建 Index 镜像"
  docker build \
    -t ${IMAGE_INDEX}:${DATETIME} \
    -t ${IMAGE_INDEX}:latest \
    -f apps/index/Dockerfile \
    .
  docker push --all-tags ${IMAGE_INDEX}
fi

if [ -d "dist/apps/customer-service" ]; then
  echo "构建 Customer Service 镜像"
  docker build \
    -t ${IMAGE_CS}:${DATETIME} \
    -t ${IMAGE_CS}:latest \
    -f apps/customer-service/Dockerfile \
    .
  docker push --all-tags ${IMAGE_CS}
fi

if [ -d "dist/apps/order-formatter" ]; then
  echo "构建 Order Formatter 镜像"
  docker build \
    -t ${IMAGE_OF}:${DATETIME} \
    -t ${IMAGE_OF}:latest \
    -f apps/order-formatter/Dockerfile \
    .
  docker push --all-tags ${IMAGE_OF}
fi
