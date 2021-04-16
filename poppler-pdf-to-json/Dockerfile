FROM alpine:3.12

WORKDIR /usr/src/poppler-pdf-to-json

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.12/community/" >> /etc/apk/repositories

RUN apk update

RUN apk add --update build-base
RUN apk add --update poppler
RUN apk add --update qt5-qtbase
RUN apk add --update qt5-qtbase-dev
RUN apk add --update poppler-qt5
RUN apk add --update poppler-dev 
RUN apk add --update poppler-qt5-dev

COPY . .
RUN rm CMakeLists.txt
RUN mv CMakeLists.txt.alpine CMakeLists.txt
RUN mkdir build
WORKDIR /usr/src/poppler-pdf-to-json/build
RUN cmake ..
RUN make

CMD ["./poppler-pdf-to-json", "../50-142.pdf"]