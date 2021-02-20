set -e
sudo apt-get update
sudo apt-get install -y haproxy

sudo sed -i 's/ENABLED=0/ENABLED=1/' /etc/default/haproxy

echo "-----------------------------"
cat /etc/haproxy/haproxy.cfg
echo "-----------------------------"

sudo cp /vagrant/haproxy.conf /etc/haproxy/haproxy.cfg
sudo chmod 777 /etc/haproxy/haproxy.cfg

echo "-----------------------------"

# sudo service haproxy restart

# sudo systemctl status haproxy
# sudo systemctl restart haproxy

sudo systemctl reload haproxy