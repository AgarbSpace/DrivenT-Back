# build step

FROM node:16.15 as build
WORKDIR /usr/src/drivent
COPY ./package*.json ./
COPY ./prisma ./prisma
COPY ./.husky ./
RUN npm install
COPY . .
RUN npm run build

# run step

FROM node:16.15
WORKDIR /usr/src/drivent
COPY ./package*.json ./
COPY ./prisma ./prisma
RUN npm install --only=production --ignore-scripts
COPY --from=build /usr/src/drivent/dist ./dist
CMD npm run start