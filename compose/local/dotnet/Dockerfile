# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.231.6/containers/dotnet/.devcontainer/base.Dockerfile

# [Choice] .NET version: 6.0, 5.0, 3.1, 6.0-bullseye, 5.0-bullseye, 3.1-bullseye, 6.0-focal, 5.0-focal, 3.1-focal
ARG VARIANT="6.0-bullseye-slim"
FROM mcr.microsoft.com/vscode/devcontainers/dotnet:0-${VARIANT}

# [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends vim netcat

# Install Entity Framework Core tools
RUN dotnet tool install --global dotnet-ef
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet ef --version

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1

ARG APP_HOME=/app/backend

WORKDIR ${APP_HOME}

COPY ./compose/production/dotnet/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/local/dotnet/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY ./compose/production/dotnet/wait-for /wait-for
RUN sed -i 's/\r$//g' /wait-for
RUN chmod +x /wait-for

COPY ./backend ${APP_HOME}

RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]

EXPOSE 8080

ENTRYPOINT ["/entrypoint"]
