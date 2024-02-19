FROM node:21.6.1-slim
WORKDIR /frontend
COPY dukka .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
