FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

# Install dependencies
RUN npm install
RUN npm install -g pushstate-server
RUN npm run build

EXPOSE 9000
CMD ["pushstate-server", "build", "9000"]


