FROM node:15.8.0-alpine as build
WORKDIR /app
COPY ./packages/service_authentication/package.json ./packages/service_authentication/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY ./packages/service_authentication ./packages/service_authentication
COPY ./packages/common ./packages/common
COPY ./webpack ./webpack
WORKDIR /app/packages/service_authentication
ENV NODE_ENV production
RUN npm run build


FROM node:15.8.0-alpine as prod
WORKDIR /app
COPY ./packages/service_authentication/package.json ./packages/service_authentication/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
COPY --from=build /app/packages/service_authentication/dist ./packages/service_authentication/dist
ENV NODE_ENV production
RUN npm ci --production
WORKDIR /app/packages/service_authentication
ARG DEFAULT_PORT=4000
ENV PORT ${DEFAULT_PORT}
EXPOSE ${PORT}
CMD [ "node", "./dist/app" ]