FROM node:gallium-slim as build
WORKDIR /opt/app

COPY . /opt/app
RUN yarn --production=false

RUN yarn build \
    && rm -rf ./node_modules \
    && yarn --production=true

FROM node:gallium-slim

WORKDIR /opt/app

COPY . /opt/app
COPY --from=build /opt/app/node_modules node_modules
COPY --from=build /opt/app/build build

ARG VERSION
ENV NODE_ENV production
ENV PORT 3000
ENV VERSION=$VERSION

EXPOSE 3000

RUN groupadd appgroup && useradd -u 999 -G appgroup appuser
USER appuser
CMD [ "yarn", "start" ]
