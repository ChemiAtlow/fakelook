FROM node:15.8.0-alpine as build-stage
WORKDIR /app
COPY ./packages/client/package.json ./packages/client/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY ./package.json ./package-lock.json ./
RUN npm i -g npm@7.6.1
RUN npm ci --legacy-peer-deps

COPY ./packages/client ./packages/client
COPY ./packages/common ./packages/common

ARG VUE_APP_SERVER
ENV VUE_APP_SERVER=${VUE_APP_SERVER}
WORKDIR /app/packages/client
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /app/packages/client/dist /app
# COPY ./packages/client/entrypoint.sh .
# RUN chmod +x ./entrypoint.sh
# RUN ./entrypoint.sh
COPY ./packages/client/nginx.conf /etc/nginx/nginx.conf
