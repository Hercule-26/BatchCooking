FROM nginx:alpine

# Clean default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy project
COPY index.html /usr/share/nginx/html/
COPY style/ /usr/share/nginx/html/css/
COPY script/ /usr/share/nginx/html/js/
COPY img/ /usr/share/nginx/html/img/

# Permissions
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]