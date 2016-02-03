FROM node:4.2.2

RUN mkdir -p /opt/url-simulator
WORKDIR /opt/url-simulator

COPY . /opt/tweet-router

RUN npm install

CMD [ "node", "index" ]