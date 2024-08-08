FROM node:22

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8082

CMD ["npm", "run","dev"]
