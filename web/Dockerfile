FROM node:20
WORKDIR /web
COPY . .

ARG _VITE_API_URI
ENV VITE_API_URI=${_VITE_API_URI}


RUN yarn 
RUN yarn build


EXPOSE 8080
CMD ["yarn","start"]

