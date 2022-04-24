#!/usr/bin/env bash

if docker volume create --name heh-shop-app &> /dev/null; then
  echo "Created volume heh-shop-app"
else
  echo "Failed to create volume heh-shop"
fi

docker network create heh-shop-network &> /dev/null
if [ "$?" -ne "0" ]; then
  echo "Network heh-shop-network already exists"
else
  echo "Created docker network heh-shop-network"
fi
