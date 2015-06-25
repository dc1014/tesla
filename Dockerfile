FROM    ubuntu:latest

#Get Curl
RUN sudo apt-get install -y curl

#Get GPG Keys
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys \
  9554F04D7259F04124DE6B476D5A82AC7E37093B \
  DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
  FD3A5288F042B6850C66B31F09FE44734EB7990E

ENV IOJS_VERSION 2.3.1
ENV NPM_CONFIG_LOGLEVEL info

RUN curl -SLO "https://iojs.org/dist/v$IOJS_VERSION/iojs-v$IOJS_VERSION-linux-x64.tar.gz" \
&& curl -SLO "https://iojs.org/dist/v$IOJS_VERSION/SHASUMS256.txt.asc" \
&& gpg --verify SHASUMS256.txt.asc \
&& grep " iojs-v$IOJS_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
&& tar -xzf "iojs-v$IOJS_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
&& rm "iojs-v$IOJS_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc

# Bundle app source
COPY . /src

RUN cd /src; npm install

EXPOSE  8080
CMD ["iojs", "/src/index.js"]
