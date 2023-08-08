# syntax = docker/dockerfile:1.2

FROM node:18.16.0

RUN apt-get update && apt-get install -y python3.11 python3-pip

WORKDIR /app

RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cp /etc/secrets/.env

RUN addgroup --system app && adduser --ingroup app --home /home/app --shell /bin/sh app

COPY package*.json ./

RUN npm install

COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt --break-system-packages

COPY . .

RUN chown -R app:app /app
USER app

EXPOSE 3001

CMD [ "npm", "start" ]
