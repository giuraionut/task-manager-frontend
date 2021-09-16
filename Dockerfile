FROM nginx:alpine
COPY  --from=node /dist/task-manager /usr/share/nginx/html