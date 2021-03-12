FROM node:15.8.0-alpine as build
WORKDIR /app
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY ./packages/server ./packages/server
COPY ./packages/common ./packages/common
COPY ./webpack ./webpack
WORKDIR /app/packages/server
ENV NODE_ENV production
RUN npm run build


FROM node:15.8.0-alpine as prod
WORKDIR /app
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
COPY --from=build /app/packages/server/dist ./packages/server/dist
ENV NODE_ENV production
RUN npm ci --production
WORKDIR /app/packages/server
ARG DEFAULT_PORT=4000
ENV PORT ${DEFAULT_PORT}
EXPOSE ${PORT}
CMD [ "node", "./dist/app" ]