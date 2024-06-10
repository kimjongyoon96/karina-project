#!/bin/sh

# Ensure the node_modules directory exists and install dependencies if necessary
if [ ! -d "node_modules" ] || [ ! -d "node_modules/ts-node" ] || [ ! -d "node_modules/webpack-dev-server" ]; then
  npm install
fi

# Start the appropriate service based on the argument
if [ "$1" = "app" ]; then
  npx nodemon --exec ts-node ./server/server.ts
elif [ "$1" = "webpack-dev-server" ]; then
  npm run start
else
  echo "Unknown service: $1"
  exit 1
fi
