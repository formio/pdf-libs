FROM ubuntu:24.04 AS builder
LABEL maintainer="Form.io <support@form.io>"

# Set initial environment variables
ENV PDF2HTMLEX_URL=https://github.com/pdf2htmlEX/pdf2htmlEX/releases/download/v0.18.8.rc1/pdf2htmlEX-0.18.8.rc1-master-20200630-Ubuntu-focal-x86_64.deb \
    PDF2HTMLEX=pdf2htmlEX-0.18.8.rc1-master-20200630-Ubuntu-focal-x86_64.deb \
    DEBIAN_FRONTEND=noninteractive \
    NODE_MAJOR=20

# install pdf2htmlEX and NodeJS
RUN apt-get update && \
    apt-get upgrade -y && \
    # Dependencies
    apt-get install -y \
    wget \
    git \
    gpg \
    curl && \
    # pdf2htmlEX
    wget "$PDF2HTMLEX_URL" && \
    apt-get install -y --no-install-recommends ./$PDF2HTMLEX && \
    # Node.js and Yarn v1.x
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y nodejs && \
    npm install -g yarn

WORKDIR /usr/src/pdf-libs
# Install node.js packages
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Add sources
COPY src ./src
COPY *.js ./

# Add docs
COPY docs ./docs

FROM node:20-bookworm-slim
LABEL maintainer="Form.io <support@form.io>"

# Update sources, install dependencies, and install fonts
RUN echo "deb http://deb.debian.org/debian/ bookworm main contrib non-free" > /etc/apt/sources.list && \
    echo "deb-src http://deb.debian.org/debian/ bookworm main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb http://deb.debian.org/debian/ bookworm-updates main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb-src http://deb.debian.org/debian/ bookworm-updates main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb http://security.debian.org/debian-security bookworm-security main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb-src http://security.debian.org/debian-security bookworm-security main contrib non-free" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get upgrade && \
    # Disable EULA agreement for msttcorefonts
    echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | debconf-set-selections && \
    # Dependencies
    apt-get install -y --no-install-recommends \
    wget \
    g++ \
    cmake \
    make \
    ca-certificates \
    libpoppler-dev \
    libpoppler-qt5-dev \
    qtbase5-dev \
    poppler-utils \
    ghostscript && \
    # libjpeg8 dependency for pdf2htmlEX (libjpeg62-turbo is not available in bookworm)
    wget https://archive.debian.org/debian/pool/main/libj/libjpeg8/libjpeg8_8b-1_amd64.deb && \
    apt-get install -y ./libjpeg8_8b-1_amd64.deb && \
    # Fonts
    wget https://github.com/google/fonts/archive/main.tar.gz -O gf.tar.gz && \
    tar -xf gf.tar.gz && \
    mkdir -p /usr/share/fonts/truetype/google-fonts && \
    find ./fonts-main/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1 && \
    rm -f /etc/apt/sources.list && \
    # Cleanup
    apt-get clean && \
    rm -f gf.tar.gz && \
    rm -rf /fonts-main

ENV APP_ROOT=/usr/src/pdf-libs
WORKDIR $APP_ROOT

# Build extract-formfields tool
COPY cpp ./cpp
ARG EXTRACT_FORMFIELDS_ROOT=$APP_ROOT/cpp/extract-formfields
WORKDIR $EXTRACT_FORMFIELDS_ROOT
RUN ${EXTRACT_FORMFIELDS_ROOT}/build.sh
WORKDIR $APP_ROOT

# Set runtime environment variables
ENV EXTRACT_FORMFIELDS=$EXTRACT_FORMFIELDS_ROOT/bin/extract-formfields \
    PDF2HTMLEX_PATH="/usr/local/bin/pdf2htmlEX" \
    PSTOPDF_PATH="/usr/bin/ps2pdf"

COPY --from=builder ${PDF2HTMLEX_PATH} ${PDF2HTMLEX_PATH}
COPY --from=builder /usr/src/pdf-libs /usr/src/pdf-libs

EXPOSE ${PORT}

CMD [ "node", "main.js" ]
