FROM node:20
WORKDIR /web
COPY . .
RUN yarn 
RUN yarn build

ENV _VITE_API_URI $VITE_API_URI

EXPOSE 8080
CMD ["yarn","start"]
