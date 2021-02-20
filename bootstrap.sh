set -e
apt-get update
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs -y
sudo npm install pm2 -g
cd /vagrant
npm install
export POSTGRES_USER=postgres
export POSTGRES_HOST=192.168.50.3   
export POSTGRES_DATABASE=postgres
export POSTGRES_PASSWORD=postgres
export POSTGRES_PORT=5432
npm run setup
export POSTGRES_DATABASE=twitter_dev
npm run tables
pm2 start npm -- start
pm2 ps