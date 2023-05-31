FROM node:18.14.2

COPY package.json .
COPY package-lock.json .
ADD . /app/

WORKDIR /app

RUN npm install

RUN chown -R 42420:42420 /app 
ENV HOME=/app

CMD npm run start