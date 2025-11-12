FROM node:24-trixie-slim

# Set installation environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV APP_ROOT=/usr/src/pdf-libs
ARG EXTRACT_FORMFIELDS_ROOT=$APP_ROOT/cpp/extract-formfields

WORKDIR $APP_ROOT
COPY cpp/extract-formfields $EXTRACT_FORMFIELDS_ROOT

# Update sources, install dependencies, install pdf2htmlEX, extract-formfields, install fonts, and clean up
RUN echo "deb http://deb.debian.org/debian/ trixie main contrib non-free" > /etc/apt/sources.list \
    && echo "deb-src http://deb.debian.org/debian/ trixie main contrib non-free" >> /etc/apt/sources.list \
    && echo "deb http://deb.debian.org/debian/ trixie-updates main contrib non-free" >> /etc/apt/sources.list \
    && echo "deb-src http://deb.debian.org/debian/ trixie-updates main contrib non-free" >> /etc/apt/sources.list \
    && echo "deb http://security.debian.org/debian-security trixie-security main contrib non-free" >> /etc/apt/sources.list \
    && echo "deb-src http://security.debian.org/debian-security trixie-security main contrib non-free" >> /etc/apt/sources.list \
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
    # Install pdf2htmlEX via our fork (which has been modified to build successfully)
    && git clone https://github.com/brendanbond/pdf2htmlEX.git \
    && cd pdf2htmlEX \
    && ./buildScripts/buildInstallLocallyApt \
    && cd .. \
    && rm -rf pdf2htmlEX \
    # Install extract-formfields
    && cd ${EXTRACT_FORMFIELDS_ROOT} \
    && ${EXTRACT_FORMFIELDS_ROOT}/build.sh \
    && find . -mindepth 1 -maxdepth 1 ! -name 'bin' -exec rm -rf {} + \
    && cd ${APP_ROOT} \
    # Fonts
    && wget https://github.com/google/fonts/archive/main.tar.gz -O gf.tar.gz \
    && tar -xf gf.tar.gz \
    && mkdir -p /usr/share/fonts/truetype/google-fonts \
    && find ./fonts-main/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1 \
    # Clean up
    && rm gf.tar.gz && rm -rf fonts-main \
    && apt-get remove -y wget g++ cmake make git ca-certificates \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* \
    && rm -rf /var/tmp/*

# Install pdf-libs Node.js dependencies and clean up
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile \
    && yarn cache clean \
    && find node_modules -name "*.md" -delete \
    && find node_modules -name "*.ts" -delete \
    && find node_modules -name "*.map" -delete \
    && find node_modules -type d -name "test" -exec rm -rf {} + 2>/dev/null || true \
    && find node_modules -type d -name "tests" -exec rm -rf {} + 2>/dev/null || true \
    && find node_modules -type d -name "docs" -exec rm -rf {} + 2>/dev/null || true

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
