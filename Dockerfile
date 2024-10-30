FROM node:16 AS base


FROM base AS development

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start-dev"]


FROM base AS production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
CMD ["npm", "start"]



#ARG NODE_ENV
#RUN if [ "$NODE_ENV" = 'production' ]; \
#    then npm install --only=production; \
#    else npm install; \
#    fi \



# docker build -t express-node-app .
# docker ps
# docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro --env-file ./.env -d -p 4000:4000 express-node-app
# docker rm express-node-app-container -f
# docker exec -it express-node-app-container bash
# docker exec -it node-app-mongo-1 mongosh -username root -p example
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
# docker logs express-node-app-container
# docker volume prune
# docker volume ls