Vagrant.configure("2") do |config|
  
  config.vm.define "ha" do |ha|
    ha.vm.box = "hashicorp/bionic64"
    ha.vm.hostname = "ha"
    ha.vm.provision :shell, path: "haproxy.sh"
    ha.vm.network "private_network", ip: "192.168.50.2" 

  end

  config.vm.define "db", primary: true do |db|
    db.vm.box = "hashicorp/bionic64"
    db.vm.hostname = "db"
    db.vm.provision :shell, path: "database.sh"
    db.vm.network "private_network", ip: "192.168.50.3" 

  end

  config.vm.define "web1" do |web|
    web.vm.box = "hashicorp/bionic64"
    web.vm.hostname = "web1"
    web.vm.provision :shell, path: "bootstrap.sh"
    web.vm.network "private_network", ip: "192.168.50.4", hostname: true

  end

  config.vm.define "web2" do |web|
    web.vm.box = "hashicorp/bionic64"
    web.vm.hostname = "web2"
    web.vm.provision :shell, path: "bootstrap.sh"
    web.vm.network "private_network", ip: "192.168.50.5", hostname: true

  end

end
