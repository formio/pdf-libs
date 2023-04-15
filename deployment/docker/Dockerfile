FROM node:lts-alpine3.12
LABEL maintainer="Form.io <support@form.io>"

ENV PDF2HTMLEX_URL=https://github.com/pdf2htmlEX/pdf2htmlEX/releases/download/v0.18.8.rc1/pdf2htmlEX-0.18.8.rc1-master-20200630-alpine-3.12.0-x86_64.tar.gz \
    PDF2HTMLEX=pdf2htmlEX-0.18.8.rc1-master-20200630-alpine-3.12.0-x86_64.tar.gz

# Installing initial dependencies and extracting pdf2htmlEX
RUN apk upgrade && \
    apk add --no-cache --virtual .build-deps curl && \
    apk add --no-cache libstdc++ && \
    apk add --no-cache libgcc && \
    apk add --no-cache gnu-libiconv && \
    apk add --no-cache cmake && \
    apk add --no-cache gettext && \
    apk add --no-cache glib && \
    apk add --no-cache freetype && \
    apk add --no-cache fontconfig && \
    apk add --no-cache cairo && \
    apk add --no-cache libpng && \
    apk add --no-cache libjpeg-turbo && \
    apk add --no-cache libxml2 && \
    apk add --no-cache apk-tools && \
    apk add --no-cache ttf-freefont && \
    apk add --no-cache libvpx && \
    apk add --no-cache wget && \
    curl -fsSLO "$PDF2HTMLEX_URL" && \
    tar xvf "$PDF2HTMLEX" -C / && \
    apk del .build-deps

# Installing edge dependencies
RUN apk add -u yarn nghttp2 nghttp2-libs libxslt libass libx11 chromium ghostscript && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/cache/apk/*
# sed -i -e 's/v[[:digit:]]\..*\//edge\//g' /etc/apk/repositories && \


# Installing fonts
# RUN apk add --no-cache msttcorefonts-installer && \
#    update-ms-fonts && \
#    wget https://github.com/google/fonts/archive/main.tar.gz -O gf.tar.gz && \
#    tar -xf gf.tar.gz && \
#    mkdir -p /usr/share/fonts/truetype/google-fonts && \
#    find ./fonts-main/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1 && \
#    rm -f gf.tar.gz && \
#    rm -rf /fonts-main

# Installing poppler
RUN apk update && \
   apk add build-base && \
   apk add poppler && \
   apk add qt5-qtbase && \
   apk add qt5-qtbase-dev && \
   apk add poppler-qt5 && \
   apk add poppler-dev && \
   apk add poppler-qt5-dev && \
   rm -rf /var/cache/apk/*

ENV APP_ROOT=/usr/src/pdf-libs
WORKDIR $APP_ROOT

# Building C++ tools
COPY cpp ./cpp
## Building extract-formfields tool
ARG EXTRACT_FORMFIELDS_ROOT=$APP_ROOT/cpp/extract-formfields
WORKDIR $EXTRACT_FORMFIELDS_ROOT
RUN ${EXTRACT_FORMFIELDS_ROOT}/build.sh

## Building hide-formfields tool
ARG HIDE_FORMFIELDS_ROOT=$APP_ROOT/cpp/hide-formfields
WORKDIR $HIDE_FORMFIELDS_ROOT
RUN ${HIDE_FORMFIELDS_ROOT}/build.sh
# End building C++ tools

# Instantiate environment variables
ENV EXTRACT_FORMFIELDS=$EXTRACT_FORMFIELDS_ROOT/bin/extract-formfields \
    HIDE_FORMFIELDS=$HIDE_FORMFIELDS_ROOT/bin/hide-formfields \
    PDF2HTMLEX_PATH="/usr/local/bin/pdf2htmlEX" \
    PSTOPDF_PATH="/usr/bin/ps2pdf" \
    PORT="8080"

# Installing node.js packages
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod

# Adding sources
COPY src ./src
COPY *.js ./

# Adding docs
COPY docs ./docs

EXPOSE ${PORT}

CMD [ "node", "main.js" ]
