FROM node:alpine

WORKDIR /usr/app/frontend

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
COPY ./shareds /usr/app/shareds

RUN npm install

COPY ./frontend .

EXPOSE 3000

CMD ["npm", "run", "start"]