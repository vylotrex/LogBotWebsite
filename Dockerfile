# Simple static-site image
FROM nginx:alpine
COPY . /usr/share/nginx/html
