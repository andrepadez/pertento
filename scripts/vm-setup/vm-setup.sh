#!/bin/bash

sudo apt update -y && sudo apt upgrade -y

sudo apt install net-tools unzip zsh -y

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

curl -fsSL https://bun.sh/install | bash
exec /usr/bin/zsh

sudo apt install nodejs -y

sudo apt install npm -y

sudo chown -R $(whoami) /usr/local/

npm i -g n

n latest

n -v
npm -v

sudo apt install redis
sudo apt install postgresql
sudo apt install nginx




