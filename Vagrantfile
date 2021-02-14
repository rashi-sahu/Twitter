Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.hostname = "host.local"
  config.vm.network "private_network", ip: "192.168.50.4", hostname: true
end
