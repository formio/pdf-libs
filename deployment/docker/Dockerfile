FROM node:24-trixie-slim AS builder
LABEL maintainer="Form.io <support@form.io>"

# Set installation environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Update sources, install dependencies, and install fonts
RUN echo "deb http://deb.debian.org/debian/ bookworm main contrib non-free" > /etc/apt/sources.list \
    && echo "deb-src http://deb.debian.org/debian/ bookworm main contrib non-free" >> /etc/apt/sources.list \
    && echo "deb http://deb.debian.org/debian/ bookworm-updates main contrib non-free" >> /etc/apt/sources.list \
    && echo "deb-src http://deb.debian.org/debian/ bookworm-updates main contrib non-free" >> /etc/apt/sources.list \
    && echo "deb http://security.debian.org/debian-security bookworm-security main contrib non-free" >> /etc/apt/sources.list \
    && echo "deb-src http://security.debian.org/debian-security bookworm-security main contrib non-free" >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get upgrade -y \
    # Disable EULA agreement for msttcorefonts
    && echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | debconf-set-selections \
    # Dependencies
    && apt-get install -y --no-install-recommends \
    wget \
    g++ \
    cmake \
    make \
    ca-certificates \
    libpoppler-dev \
    libpoppler-qt5-dev \
    qtbase5-dev \
    poppler-utils \
    ghostscript \
    git \
    sudo \
    # Fonts
    && wget https://github.com/google/fonts/archive/main.tar.gz -O gf.tar.gz \
    && tar -xf gf.tar.gz \
    && mkdir -p /usr/share/fonts/truetype/google-fonts \
    && find ./fonts-main/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1 \
    && rm gf.tar.gz && rm -rf fonts-main

# Install pdf2htmlEX
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    # Check out a fork that has been modified to build on trixie
    && git clone https://github.com/brendanbond/pdf2htmlEX.git \
    && cd pdf2htmlEX \
    && ./buildScripts/buildInstallLocallyApt \
    && cd .. \
    && rm -rf pdf2htmlEX

# Build extract-formfields tool
ENV APP_ROOT=/usr/src/pdf-libs
ARG EXTRACT_FORMFIELDS_ROOT=$APP_ROOT/cpp/extract-formfields

WORKDIR $APP_ROOT
COPY cpp/extract-formfields $EXTRACT_FORMFIELDS_ROOT
WORKDIR $EXTRACT_FORMFIELDS_ROOT
RUN $EXTRACT_FORMFIELDS_ROOT/build.sh && \
    # only preserve the executable
    find . -mindepth 1 -maxdepth 1 ! -name 'bin' -exec rm -rf {} +

# ---------------------------------------------

FROM node:20-bookworm-slim

ENV APP_ROOT=/usr/src/pdf-libs
ARG EXTRACT_FORMFIELDS_ROOT=$APP_ROOT/cpp/extract-formfields

RUN apt update && apt upgrade -y && \
    apt install -y \
    libqt5core5a \
    libqt5gui5 \
    libqt5xml5 \
    libpoppler-qt5-1 \
    poppler-utils \
    ghostscript \
    && rm -f /etc/apt/sources.list \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR $APP_ROOT

COPY --from=builder /usr/share/fonts/truetype/google-fonts /usr/share/fonts/truetype/google-fonts

COPY --from=builder ${APP_ROOT}/cpp ./cpp
COPY --from=builder /usr/local/bin/pdf2htmlEX /usr/local/bin/pdf2htmlEX

# Install pdf-libs npm dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile \
    && yarn cache clean

# Add sources
COPY src ./src
COPY *.js ./

# Add docs
COPY docs ./docs

# Set runtime environment variables
ENV EXTRACT_FORMFIELDS=$EXTRACT_FORMFIELDS_ROOT/bin/extract-formfields \
    PDF2HTMLEX_PATH="/usr/local/bin/pdf2htmlEX" \
    PSTOPDF_PATH="/usr/bin/ps2pdf"

EXPOSE ${PORT}

CMD [ "node", "main.js" ]
