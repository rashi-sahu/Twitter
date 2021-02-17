set -e
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

sudo apt-get update
sudo apt-get install -y postgresql-13
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

sudo cp /vagrant/pg_hba.conf /etc/postgresql/13/main/pg_hba.conf
sudo chmod 0600 /etc/postgresql/13/main/pg_hba.conf
echo "listen_addresses = '*'" | sudo tee /etc/postgresql/13/main/conf.d/listen_address.conf
sudo systemctl restart postgresql.service