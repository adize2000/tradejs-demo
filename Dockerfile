FROM node:4-onbuild
#FROM node:argon


# Create app directory
# RUN mkdir -p /usr/src/trade-demo
# WORKDIR /usr/src/trade-demo

# Install app dependencies
# COPY package.json /usr/src/trade-demo/
# RUN npm install

# Bundle app source
# COPY . /usr/src/trade-demo/

EXPOSE 8888

# CMD [ "npm", "start" ]
