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

You must have the [openmoney-api](https://github.com/deefactorial/openmoney-api) installed and running on port 8080.

```sh

sudo apt-get install nginx
cp openmoney-network.nginx.conf /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/openmoney-network.nginx.conf /etc/nginx/sites-enabled/openmoney-network.nginx.conf
sudo gedit /etc/nginx/sites-available/openmoney-network.nginx.conf #modify the root path and the location / alias path to this repo path
sudo service nginx reload
google-chrome http://localhost
```

It is strongly recommended to setup ssl for nginx if you are hosting locally, [Lets Encrypt](https://letsencrypt.org/) is a free service to get SSL certificates.

#License

Copyright [2016] [Dominique Legault]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
