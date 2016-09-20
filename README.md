# openmoney-network
Openmoney Network Client for the Openmoney API

# Install
```sh
git clone https://github.com/deefactorial/openmoney-network.git
npm install
grunt
```

# Setup Nginx Server
```sh
sudo apt-get install nginx
sudo cp openmoney-network.nginx.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-enabled/openmoney-network.nginx.conf /etc/nginx/sites-available/openmoney-network.nginx.conf
sudo gedit /etc/nginx/sites-available/openmoney-network.nginx.conf
sudo service nginx restart
```

# Start Openmoney API
[https://github.com/deefactorial/openmoney-api/](openmoney-api)
