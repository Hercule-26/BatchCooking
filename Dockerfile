FROM nginx:alpine

# Clean default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy project
COPY . /usr/share/nginx/html/

# Permissions
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]