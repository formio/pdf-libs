FROM node:14.16.0-alpine3.12

RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
    apk-tools \
    ttf-freefont \
    gnu-libiconv-dev \
    libvpx \
    dumb-init \
    git \
    wget
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

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.12/community/" >> /etc/apk/repositories

RUN apk update

RUN apk add --update build-base
RUN apk add --update poppler
RUN apk add --update qt5-qtbase
RUN apk add --update qt5-qtbase-dev
RUN apk add --update poppler-qt5
RUN apk add --update poppler-dev
RUN apk add --update poppler-qt5-dev

WORKDIR /usr/src/rest-wrapper
ENV POPPLER_PDF_TO_JSON="./pdf-to-json/build/poppler-pdf-to-json" \
    PDF2HTMLEX_PATH="./pdf2HtmlEx/usr/local/bin/pdf2htmlEX" \
    PSTOPDF_PATH="/usr/bin/ps2pdf"
#    PORT=8080

COPY package*.json ./

# Installing python 2.7
RUN apk add python2

COPY docs ./docs
COPY src ./src

COPY *.js ./

## Installing node.js packages
RUN npm install --only=prod

## Downloading and building pdf-to-json
RUN git clone --depth 1 --branch 1.0.1-rc.2 https://gitlab.com/formio/pdf-to-json.git
WORKDIR /usr/src/rest-wrapper/pdf-to-json

RUN mkdir build
WORKDIR /usr/src/rest-wrapper/pdf-to-json/build
RUN cmake ..
RUN make

WORKDIR /usr/src/rest-wrapper
# Installing pdf2htmlEX
RUN mkdir pdf2html_tmpdir
RUN mkdir pdf2HtmlEx
RUN wget https://github.com/pdf2htmlEX/pdf2htmlEX/releases/download/v0.18.8.rc1/pdf2htmlEX-0.18.8.rc1-master-20200630-alpine-3.12.0-x86_64.tar.gz -O pdf2HtmlEx.tar.gz \
    && tar -xvf pdf2HtmlEx.tar.gz  -C ./pdf2HtmlEx \
    && rm -f pdf2HtmlEx.tar.gz \

EXPOSE ${PORT}

CMD [ "node", "main.js" ]
