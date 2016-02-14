FROM fedora:23


RUN dnf -y update && dnf clean all

RUN dnf install -y ruby git nodejs npm && dnf clean all
#RUN dnf install -y mongodb-server && dnf clean all

#RUN mkdir -p /data/db/
#RUN touch /var/log/mongodb.log

#RUN mongod --fork --logpath /var/log/mongodb.log --bind_ip 127.0.0.1

#EXPOSE 27017
#CMD ["cat", "/var/log/mongodb.log"]
#CMD ["mongod", "run"]
#CMD ["mongod", "--fork", "--logpath", "/var/log/mongodb.log"]

# Install Foreman
RUN gem install foreman

# Install app dependencies
COPY . /src
WORKDIR /src
RUN npm install --production

# installing and running Bower
RUN npm install -g bower
RUN bower install --allow-root

#RUN cat /var/log/mongodb.log

#RUN cat /etc/hosts
#RUN env | grep MONGO

EXPOSE  5000
CMD ["foreman", "start"]
#CMD ["foreman", "check"]

