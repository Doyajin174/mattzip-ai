FROM node:slim

ARG SEARXNG_API_URL

WORKDIR /home/mattzip

COPY src /home/mattzip/src
COPY tsconfig.json /home/mattzip/
COPY config.toml /home/mattzip/
COPY drizzle.config.ts /home/mattzip/
COPY package.json /home/mattzip/
COPY yarn.lock /home/mattzip/

RUN sed -i "s|SEARXNG = \".*\"|SEARXNG = \"${SEARXNG_API_URL}\"|g" /home/mattzip/config.toml

RUN mkdir /home/mattzip/data

RUN yarn install 
RUN yarn build

CMD ["yarn", "start"]