#
# Docker building script for LaCaissiere backend
#

FROM node:boron

# Create and set the working directories
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Fill the directory with our app and install the dependencies
COPY . /usr/src/app
RUN npm install

# Expose the inside PORT 3000
EXPOSE 3000

# Environnement value
ENV NODE_ENV PRODUCTION 

CMD ["npm", "start"]

