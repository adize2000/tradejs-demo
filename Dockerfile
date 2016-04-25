FROM node:4-onbuild

ENV HOME /root

# install bower
RUN npm install --global bower

RUN cd /usr/src/app
RUN bower --allow-root install

EXPOSE 3000

