# Description
PDF-libs is rest-server that wraps PDFtoJSON and PDFtoHTMLEX utils

# Running without docker
* uncomment variables in .env file
* change PORT variable if need
* run `node main`

# Running with docker
* build an image: `docker build . --tag=pdf-libs`
* run a container with name and port you need: 
  
  `docker run --name pdf-libs1 -p 8080:8080 -e PORT=8080 pdf-libs`

# Docs
Interactive Swagger documentation is available on `/api-docs` endpoint

