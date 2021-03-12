FROM node:15.8.0-alpine as build
WORKDIR /app
COPY ./packages/service_view/package.json ./packages/service_view/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY ./packages/service_view ./packages/service_view
COPY ./packages/common ./packages/common
COPY ./webpack ./webpack
WORKDIR /app/packages/service_view
ENV NODE_ENV production
RUN npm run build


FROM node:15.8.0-alpine as prod
WORKDIR /app
COPY ./packages/service_view/package.json ./packages/service_view/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
COPY --from=build /app/packages/service_view/dist ./packages/service_view/dist
ENV NODE_ENV production
RUN npm ci --production
WORKDIR /app/packages/service_view
ARG DEFAULT_PORT=4445
ENV VIEW_PORT ${DEFAULT_PORT}
EXPOSE ${VIEW_PORT}
CMD [ "node", "./dist/app" ]