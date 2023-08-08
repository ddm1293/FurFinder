FROM node:18.16.0

RUN apt-get update && apt-get install -y python3.11 python3-pip

WORKDIR /app

RUN addgroup --system app && adduser --ingroup app --home /home/app --shell /bin/sh app
RUN chown -R app:app /app
USER app

COPY package*.json ./

RUN npm install

COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 10000

CMD [ "npm", "start" ]
