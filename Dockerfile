FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
COPY . .

RUN npm install -g pnpm

# RUN apk -U --no-cache add protobuf
RUN pnpm install

ARG NODE_ENV
ARG SERVICE_NAME

ENV ENV=dev
ENV SERVICE_NAME=book

RUN pnpm build:${SERVICE_NAME}:${ENV}

EXPOSE 9000

CMD pnpm start:prod:${SERVICE_NAME}:${ENV}