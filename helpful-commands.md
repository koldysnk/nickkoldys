#Certifications
certbot certificates
sudo certbot certonly --dry-run --apache -d SUBDOMAIN.YOUR-DOMAIN-NAME
sudo certbot delete --cert-name example.com

sudo nano /etc/apache2/sites-available/nk.conf
sudo nano /etc/nginx/sites-available/server

#Site
sudo service apache2 restart; sudo journalctl -xe
sudo service nginx restart; sudo journalctl -xe

#Server
./node_modules/.bin/pm2 status
./node_modules/.bin/pm2 start --name server app.js
./node_modules/.bin/pm2 stop