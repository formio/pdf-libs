FROM alpine:3.12.12
LABEL maintainer="Form.io <support@form.io>"

# Installing dependencies
RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
    apk-tools \
    cmake \
    ttf-freefont \
    gnu-libiconv-dev \
    libvpx \
    dumb-init \
    git \
    wget \
    && sed -i -e 's/v[[:digit:]]\..*\//edge\//g' /etc/apk/repositories \
    && apk add --upgrade \
    nodejs npm yarn nghttp2 nghttp2-libs libxslt libass cairo libx11 ghostscript poppler-data poppler-utils gettext\
    && rm -rf /var/lib/apt/lists/* \
    && rm /var/cache/apk/*

# Fonts
RUN apk add --no-cache msttcorefonts-installer fontconfig \
    && update-ms-fonts \
# Google fonts
    && wget https://github.com/google/fonts/archive/main.tar.gz -O gf.tar.gz \
    && tar -xf gf.tar.gz \
    && mkdir -p /usr/share/fonts/truetype/google-fonts \
    && find ./fonts-main/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1 \
    && rm -f gf.tar.gz \
    && rm -rf /fonts-main

RUN apk add --upgrade nghttp2 nghttp2-libs libxslt libass cairo libx11 chromium ghostscript poppler-data poppler-utils gettext \
        && rm -rf /var/lib/apt/lists/* \
        && rm /var/cache/apk/*


RUN apk update

RUN apk add --update build-base
RUN apk add --update poppler
RUN apk add --update qt5-qtbase
RUN apk add --update qt5-qtbase-dev
RUN apk add --update poppler-qt5
RUN apk add --update poppler-dev
RUN apk add --update poppler-qt5-dev
# End installing dependencies

ENV APP_ROOT=/usr/src/pdf-libs
WORKDIR $APP_ROOT

# Building C++ tools
COPY cpp ./cpp
## Building extract-formfields tool
ARG EXTRACT_FORMFIELDS_ROOT=$APP_ROOT/cpp/extract-formfields
WORKDIR $EXTRACT_FORMFIELDS_ROOT
RUN ${EXTRACT_FORMFIELDS_ROOT}/build.sh
ENV EXTRACT_FORMFIELDS=$EXTRACT_FORMFIELDS_ROOT/bin/extract-formfields

## Building hide-formfields tool
ARG HIDE_FORMFIELDS_ROOT=$APP_ROOT/cpp/hide-formfields
WORKDIR $HIDE_FORMFIELDS_ROOT
RUN ${HIDE_FORMFIELDS_ROOT}/build.sh
ENV HIDE_FORMFIELDS=$HIDE_FORMFIELDS_ROOT/bin/hide-formfields
# End building C++ tools

# Installing third-party tools
## Installing pdf2htmlEX
WORKDIR /usr/src/pdf-libs
RUN mkdir pdf2HtmlEx
RUN wget https://github.com/pdf2htmlEX/pdf2htmlEX/releases/download/v0.18.8.rc1/pdf2htmlEX-0.18.8.rc1-master-20200630-alpine-3.12.0-x86_64.tar.gz -O pdf2HtmlEx.tar.gz \
    && tar -xvf pdf2HtmlEx.tar.gz  -C / \
    && rm -f pdf2HtmlEx.tar.gz
ENV PDF2HTMLEX_PATH="/usr/local/bin/pdf2htmlEX" \
    PSTOPDF_PATH="/usr/bin/ps2pdf"
# End installing third-party tools

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
