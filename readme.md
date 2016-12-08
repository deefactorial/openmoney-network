#openmoney-network

This is the client side application that accesses the [openmoney-api](https://github.com/deefactorial/openmoney-api).

#Public Instance

[openmoney.network](https://openmoney.network) or [net.openmoney.gift](https://net.openmoney.gift)

#Installation

```sh
git clone https://github.com/deefactorial/openmoney-network
cd openmoney-network
npm install
```

#Build

`grunt`

#Local Hosting

```sh
sudo apt-get install nginx
cp openmoney-network.nginx.conf /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/openmoney-network.nginx.conf /etc/nginx/sites-enabled/openmoney-network.nginx.conf
sudo gedit /etc/nginx/sites-available/openmoney-network.nginx.conf #modify the root path and the location / alias path to this repo path
sudo service nginx reload
```
