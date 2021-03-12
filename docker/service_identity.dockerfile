FROM node:15.8.0-alpine as build
WORKDIR /app
COPY ./packages/service_identity/package.json ./packages/service_identity/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY ./packages/service_identity ./packages/service_identity
COPY ./packages/common ./packages/common
COPY ./webpack ./webpack
WORKDIR /app/packages/service_identity
ENV NODE_ENV production
RUN npm run build


FROM node:15.8.0-alpine as prod
WORKDIR /app
COPY ./packages/service_identity/package.json ./packages/service_identity/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
COPY --from=build /app/packages/service_identity/dist ./packages/service_identity/dist
ENV NODE_ENV production
RUN npm ci --production
WORKDIR /app/packages/service_identity
ARG DEFAULT_PORT=4443
ENV IDENTITY_PORT ${DEFAULT_PORT}
EXPOSE ${IDENTITY_PORT}
CMD [ "node", "./dist/app" ]