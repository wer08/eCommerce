FROM node:14

WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash
RUN az login
CMD npm start