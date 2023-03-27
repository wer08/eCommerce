FROM node

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm install -g vite

EXPOSE 5173

CMD ["npm", "run", "dev"]