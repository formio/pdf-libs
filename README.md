# Description
pdf-libs is REST-server that wraps extract-formfields and PDFtoHTMLEX utils

# Running without docker
* uncomment variables in .env file
* change PORT variable if need
* run `node main`

# Running with docker
* pull the image: `docker pull formio/pdf-libs`
* run a container with name and port you need:
  
  * `docker run -d --name pdf-libs -p 8080:8080 -e PORT=8080 formio/pdf-libs`

## M1 Mac
  * `docker run -d --name pdf-libs -p 8080:8080 -e PORT=8080 --platform linux/amd64 formio/pdf-libs`

# Environment variables
| Variable                | Description                                                                                                                                               | Default value |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| PDFLIBS_PORT            | Port, which service will use                                                                                                                              | 8080          |
| HTML_GENERATION_TIMEOUT | Primary timeout in milliseconds for html generation                                                                                                                       | 7000          |
| HTML_GENERATION_BACKOFF | Backoff timeout in milliseconds for html generation. Its sum with primary timeout will be used for second try after postscript optimisation in case when first try failed | 23000         |
# Building
  * `docker build -t pdf-libs -f deployment/docker/Dockerfile .`

## M1 Mac
  * `docker build -t pdf-libs -f deployment/docker/Dockerfile --platform linux/amd64 .`
# Docs
* Code documentation is at docs/index.html

# Licensing
This source code is licenced under the GPL, version 3

License text is available in LICENSE file
