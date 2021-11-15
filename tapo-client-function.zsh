tapo() {
  if ping -c 1 tosh > /dev/null; then host=tosh
  elif ping -c 1 main > /dev/null; then host=main 
  elif ping -c 1 rpi > /dev/null; then host=rpi
  else echo "couldn't find a host" && break
  fi
 curl -H "Authorization: Bearer $(cat ~/.config/token/tapo)" $host/tapo/$1 
}
