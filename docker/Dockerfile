FROM ubuntu:18.04

RUN apt-get update && apt-get install -y --no-install-recommends \
    emacs \
    git \
    python3.6 \
    wget \
    ca-certificates \
    python3-distutils \
    curl \
    software-properties-common \
    gcc \
    python3.6-dev \
    g++ \
    libmysqlclient-dev \
    python3-mysqldb \
    nmap \
    less

RUN cd /tmp/ && wget https://bootstrap.pypa.io/get-pip.py && python3 get-pip.py
RUN pip install \
    base58 \
    py-solc \
    pylint \
    SQLAlchemy \
    arrow \
    pycryptodome \
    Django \
    djangorestframework \
    web3 \
    pylint-django

RUN python3 -m solc.install v0.4.25 && \
    cp $HOME/.py-solc/solc-v0.4.25/bin/solc /usr/local/bin/

EXPOSE 8080

# install node 10
RUN apt-get install -y gpg-agent
RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true apt-key add -
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install -y yarn

# install yarn packages
WORKDIR /app/
ADD package-lock.json package.json README.md yarn.lock /app/
RUN yarn
#RUN npx browserslist --update-db

# copy and build the code
ADD src/ /app/src/
ADD public/ /app/public/
RUN yarn build
#
#CMD yarn start

FROM nginx:latest

COPY --from=0 /app/build/ /usr/share/nginx/html/