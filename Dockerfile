FROM nginx:alpine

# Delete default config
RUN rm -rf /usr/share/nginx/html/*

# Copy project
COPY . /usr/share/nginx/html

EXPOSE 80

# Launch nginx
CMD ["nginx", "-g", "daemon off;"]