FROM node:12-slim

RUN apt-get update && \
apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

RUN yarn global add puppeteer && yarn cache clean

ENV NODE_PATH="/usr/local/share/.config/yarn/global/node_modules:${NODE_PATH}"

# Set language to UTF8
ENV LANG="C.UTF-8"

WORKDIR /app

CMD ["node", "index.js"]