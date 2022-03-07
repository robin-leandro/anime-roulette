FROM node:14.16.0

WORKDIR /home/anro-service

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and install before app code to take advantage of Docker layers
COPY ./package.json .
RUN npm install --silent

# Now copy the whole thing
COPY . /.

CMD ["npm", "run", "start"]

EXPOSE 5001