FROM node:alpine

WORKDIR /usr/app/backend

COPY ./backend/package.json ./
COPY ./backend/package-lock.json ./
COPY ./shareds /usr/app/shareds

RUN npm install

COPY ./backend .

EXPOSE 5000

CMD ["npm", "run", "dev"]