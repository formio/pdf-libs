FROM node:20-bookworm-slim
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
    && apt-get upgrade \
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
    && find ./fonts-main/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1

# Install pdf2htmlEX
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && git clone --single-branch https://github.com/pdf2htmlEX/pdf2htmlEX.git \
    && cd pdf2htmlEX \
    # openjdk-8-jre-headless is not available in bookworm, so we remove it from the script
    # (it seems like we don't actually need it to build successfully)
    && sed -i '/openjdk-8-jre-headless/d' ./buildScripts/getBuildToolsApt \
    && ./buildScripts/buildInstallLocallyApt \
    && cd .. \
    && rm -rf pdf2htmlEX

WORKDIR /usr/src/pdf-libs

# Install pdf-libs npm dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Add sources
COPY src ./src
COPY *.js ./

COPY test ./test

# Add docs
COPY docs ./docs

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

# Clean up
RUN rm -f /etc/apt/sources.list \
    && apt-get clean  \
    && rm -f gf.tar.gz  \
    && rm -rf /fonts-main  \
    && apt-get autoremove -y  \
    && apt-get remove wget -y \
    && apt-get remove git -y

EXPOSE ${PORT}

CMD [ "node", "main.js" ]
