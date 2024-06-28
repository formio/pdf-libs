FROM ubuntu:24.04
LABEL maintainer="Form.io <support@form.io>"

# Set initial environment variables
ENV PDF2HTMLEX_URL=https://github.com/pdf2htmlEX/pdf2htmlEX/releases/download/v0.18.8.rc1/pdf2htmlEX-0.18.8.rc1-master-20200630-Ubuntu-focal-x86_64.deb \
    PDF2HTMLEX=pdf2htmlEX-0.18.8.rc1-master-20200630-Ubuntu-focal-x86_64.deb \
    DEBIAN_FRONTEND=noninteractive \
    NODE_MAJOR=20

# Install dependencies, fonts, chromium, and pdf2htmlEX
RUN apt-get update && \
    # Dependencies
    apt-get install -y \
    gnupg \
    wget \
    curl \
    ca-certificates \
    g++ \
    cmake \
    make \
    openssh-client \
    git \
    libcap2-bin \
    libpoppler-dev \
    libpoppler-qt5-dev \
    qtbase5-dev \
    poppler-utils \
    ghostscript && \
    # pdf2htmlEX
    wget "$PDF2HTMLEX_URL" && \
    apt-get install -y --no-install-recommends ./$PDF2HTMLEX && \
    # Disable EULA agreement for msttcorefonts
    echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | debconf-set-selections && \
    # Fonts
    apt-get install -y ttf-mscorefonts-installer && \
    wget https://github.com/google/fonts/archive/main.tar.gz -O gf.tar.gz && \
    tar -xf gf.tar.gz && \
    mkdir -p /usr/share/fonts/truetype/google-fonts && \
    find ./fonts-main/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1 && \
    # Chromium
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/* && \
    # Node.js and Yarn v1.x
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
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

# Set runtime environment variables
ENV EXTRACT_FORMFIELDS=$EXTRACT_FORMFIELDS_ROOT/bin/extract-formfields \
    PDF2HTMLEX_PATH="/usr/local/bin/pdf2htmlEX" \
    PSTOPDF_PATH="/usr/bin/ps2pdf"

WORKDIR $APP_ROOT

# Installing node.js packages
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production

# Adding sources
COPY src ./src
COPY *.js ./

# Adding docs
COPY docs ./docs

EXPOSE ${PORT}

CMD [ "node", "main.js" ]
