# Use a lightweight Nginx web server 
FROM nginx:alpine 
 
Jenkins CI/CD Practical Guide | HTML, VS Code, GitHub and Docker 
# Copy the HTML page into the Nginx web directory 
COPY index.html /usr/share/nginx/html/index.html 
 
# Nginx listens on port 80 inside the container 
EXPOSE 80