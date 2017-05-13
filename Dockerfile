FROM node:7.10.0

# Create app directories

RUN mkdir -p /client
RUN mkdir -p /server

# Install dependencies

COPY client/package.json /client
RUN cd /client && npm install

COPY server/package.json /server
RUN cd /server && npm install

# Copy everything

COPY . /

# Build client

RUN cd /client && npm run build

# Start

WORKDIR /server
EXPOSE 3000
CMD [ "npm", "start" ]
