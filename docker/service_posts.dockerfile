FROM node:15.8.0-alpine as build
WORKDIR /app
COPY ./packages/service_posts/package.json ./packages/service_posts/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY ./packages/service_posts ./packages/service_posts
COPY ./packages/common ./packages/common
COPY ./webpack ./webpack
WORKDIR /app/packages/service_posts
ENV NODE_ENV production
RUN npm run build


FROM node:15.8.0-alpine as prod
WORKDIR /app
COPY ./packages/service_posts/package.json ./packages/service_posts/package.json
COPY ./packages/common/package.json ./packages/common/package.json
COPY package*.json ./
COPY --from=build /app/packages/service_posts/dist ./packages/service_posts/dist
ENV NODE_ENV production
RUN npm ci --production
WORKDIR /app/packages/service_posts
ARG DEFAULT_PORT=4447
ENV POSTS_PORT ${DEFAULT_PORT}
EXPOSE ${POSTS_PORT}
CMD [ "node", "./dist/app" ]