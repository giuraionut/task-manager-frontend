FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/task-manager /usr/share/nginx/html