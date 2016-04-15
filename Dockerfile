FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/TradeJS
RUN mkdir -p /usr/src/TradeJS/WebContent
WORKDIR /usr/src/TradeJS/WebContent

# Install app dependencies
COPY package.json /usr/src/TradeJS/WebContent/
RUN npm install

# Bundle app source
COPY . /usr/src/TradeJS/WebContent/

EXPOSE 8080

CMD [ "npm", "start" ]
