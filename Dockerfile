#FROM node:18-alpine
#RUN mkdir -p /app
#WORKDIR /app
#COPY . .
#RUN npm install  --loglevel verbose
#RUN npm run build
#EXPOSE 3000
#CMD ["npm", "start"]


FROM node:current-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install  --loglevel verbose
COPY . /app
ENV NODE_ENV=production
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
