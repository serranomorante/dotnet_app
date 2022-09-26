#!/usr/bin/env bash

# networks
# --------------------
docker network create dotnet_app_network &> /dev/null
if [ "$?" -ne "0" ]; then
  echo "dotnet_app_network already exists. Skipping..."
else
  echo "network successfully created: dotnet_app_network"
fi
