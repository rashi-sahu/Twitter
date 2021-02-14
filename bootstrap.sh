apt-get update
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs -y
node -v
npm -v
cd /vagrant
npm install
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

sudo apt-get update
sudo apt-get install -y postgresql-13
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
export POSTGRES_USER=postgres
export POSTGRES_HOST=localhost
export POSTGRES_DATABASE=postgres
export POSTGRES_PASSWORD=postgres
export POSTGRES_PORT=5432
npm run setup
export POSTGRES_DATABASE=twitter_dev
npm run tables
npm start