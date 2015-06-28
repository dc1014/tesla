FROM iojs:onbuild

COPY . /src

RUN cd /src; npm install

EXPOSE 8000
CMD["iojs", "/src/index.js"]
