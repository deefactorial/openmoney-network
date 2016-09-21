# openmoney-network
Openmoney Network Client for the Openmoney API

# Install
```sh
git clone https://github.com/deefactorial/openmoney-network.git
npm install
grunt
```

# Setup Nginx Server
note you may need to update your nginx ssl certificate (goto: https://letsencrypt.org/ to get free certificates)
```sh
sudo apt-get install nginx
sudo cp openmoney-network.nginx.conf /etc/nginx/sites-available/
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/openmoney-network.nginx.conf /etc/nginx/sites-enabled/openmoney-network.nginx.conf
sudo service nginx stop
sudo apt-get install letsencrypt
sudo letsencrypt certonly --standalone -d example.com -d www.example.com
sudo gedit /etc/nginx/sites-available/openmoney-network.nginx.conf
sudo service nginx start
```

# Start Openmoney API
[openmoney-api](https://github.com/deefactorial/openmoney-api/)

# Go to localhost
[localhost](https://localhost)

# Issues
[issues](https://github.com/deefactorial/openmoney-api/issues)
