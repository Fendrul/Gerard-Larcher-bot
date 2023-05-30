FROM node:18.14.2

COPY package.json .
COPY package-lock.json .
ADD . /app/
WORKDIR /app
RUN npm install

CMD npm run start