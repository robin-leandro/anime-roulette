FROM node:14.16.0

WORKDIR /home/anro-webapp

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# just copy the whole mfing thang
COPY . ./

RUN npm install --silent

CMD ["npm", "start"]

EXPOSE 5002