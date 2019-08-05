# Download base image nodejs
FROM node:12.1.0 as build-env

COPY . /src

WORKDIR src

RUN npm install
CMD ["npm", "start"]

# Set port and start service
EXPOSE 4000

