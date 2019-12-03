#### for building docker
## docker build -t payment-backoffice-ui .
## docker build -t docker-registry.cdweb.biz/tmp/payment-backoffice-ui .
## docker tag appsupport docker-registry.cdweb.biz/tmp/payment-backoffice-ui
## docker push docker-registry.cdweb.biz/tmp/payment-backoffice-ui

#### Adding image to Kubebernetes
##  kubectl run --image=docker-registry.cdweb.biz/tmp/payment-backoffice-uit payment-backoffice-ui --port 80
## kubectl expose deployment/payment-backoffice-ui

#### runing docker localy
## docker run -p 7001:80 payment-backoffice-ui


FROM node:9 as builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY build /usr/src/app/

#COPY package.json /usr/src/app/package.json
#COPY .npm* /usr/src/app/


#RUN yarn install 
#COPY . /usr/src/app/
#RUN yarn build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
