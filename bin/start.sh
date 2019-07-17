#!/usr/bin/env bash

set -e

RED='\033[1;31m'
GREEN='\033[1;32m'
CYAN='\033[1;36m'
WHITE='\033[1;37m'
YELLOW='\e[33m'
NC='\033[0m'

INFO="${CYAN}[info]${NC}"
WARN="${YELLOW}[warning]${NC}"
FATAL="${RED}[fatal]${NC}"

echo '================================'
echo -e "${INFO} Starting Story___."

if [[ $NODE_ENV == '' ]]; then
  NODE_ENV=production
  echo -e "${INFO} ${RED}NODE_ENV${NC}=${WHITE}${NODE_ENV}${NC}"
else
  echo -e "${INFO} ${RED}NODE_ENV${NC}=${WHITE}development${NC} ${GREEN}[default]${NC}"
fi

if [[ $DEBUG == '' ]]; then
  if [[ $NODE_ENV == production ]]; then
    DEBUG=false
  else
    DEBUG=true
  fi
  echo -e "${INFO} ${RED}DEBUG${NC}=${WHITE}${DEBUG}${NC} ${GREEN}[default]${NC}"
else
  echo -e "${INFO} ${RED}DEBUG${NC}=${WHITE}${DEBUG}${NC}"
fi

arr[0]="'I wish it need not have happened in my time,' said Frodo. 'So do I,' said Gandalf, 'and so do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given us.'"
arr[1]="Faithless is he that says farewell when the road darkens."
arr[2]="It's the job that's never started as takes longest to finish."
arr[3]="Not all those who wander are lost."
arr[4]="It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to."
rand=$[$RANDOM % ${#arr[@]}]

echo -e "\n"\""${GREEN}${arr[$rand]}${NC}\""${CYAN}" - J.R.R. Tolkien"${NC}"\n"

webpack-dev-server --progress --colors --inline --watch --hot --config webpack.dev.js