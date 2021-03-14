FROM node:15.8.0-alpine as build
WORKDIR /app
ARG SERVICE_NAME
COPY ./packages/${SERVICE_NAME}/package.json ./packages/${SERVICE_NAME}/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY ./packages/${SERVICE_NAME} ./packages/${SERVICE_NAME}
COPY ./packages/common ./packages/common
COPY ./webpack ./webpack
WORKDIR /app/packages/${SERVICE_NAME}
ENV NODE_ENV production
RUN npm run build


FROM node:15.8.0-alpine as prod
WORKDIR /app
ARG SERVICE_NAME
COPY ./packages/${SERVICE_NAME}/package.json ./packages/${SERVICE_NAME}/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
COPY --from=build /app/packages/${SERVICE_NAME}/dist ./packages/${SERVICE_NAME}/dist
ENV NODE_ENV production
RUN npm ci --production
WORKDIR /app/packages/${SERVICE_NAME}
ARG DEFAULT_PORT=9417
ENV AUTH_PORT ${DEFAULT_PORT}
EXPOSE ${AUTH_PORT}
CMD [ "node", "./dist/app" ]