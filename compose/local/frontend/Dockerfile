# Node
FROM node:14.17-alpine AS builder

ARG APP_HOME=/app/frontend

WORKDIR ${APP_HOME}

COPY ./frontend/package.json ${APP_HOME}
COPY ./frontend/yarn.lock ${APP_HOME}

RUN yarn install --frozen-lockfile

COPY ./frontend ${APP_HOME}

RUN yarn build && yarn --production

# Nginx
FROM nginx:1.19-alpine as server

ARG APP_HOME=/app/frontend

WORKDIR ${APP_HOME}

COPY ./compose/local/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Nginx docker image uses this folder to serve the contents
COPY --from=builder ${APP_HOME}/dist /usr/share/nginx/html

COPY ./compose/production/frontend/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/local/nginx/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

EXPOSE 1234

ENTRYPOINT ["/entrypoint"]
