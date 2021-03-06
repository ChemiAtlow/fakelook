FROM node:15.8.0-alpine as build-stage
WORKDIR /app
COPY ./packages/client/package.json ./packages/client/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY ./package.json yarn.lock ./
RUN npm i -g braces
RUN yarn --frozen-lockfile || true
RUN yarn --frozen-lockfile

COPY ./packages/client ./packages/client
COPY ./packages/common ./packages/common

WORKDIR /app/packages/client
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/packages/client/dist /app
COPY ./packages/client/nginx.conf /etc/nginx/nginx.conf