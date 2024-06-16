#!/bin/bash

TIMEOUT=10

while true; do
  time bun test 
  if [ $? -ne 0 ]; then
      # bun test failed, run it again and capture stdout
      bun test > ./testing/test-output.txt 2>&1
      bun run ./testing/send-fail-email.ts
      rm ./testing/test-output.txt
  fi
  echo "Current date and time: $(LC_TIME=sv_SE.utf8 date)"
  echo -e "\n\n\n"
 # Calculate the time until the next 10-minute mark
current_minute=$((10#$(date +%M)))
current_second=$((10#$(date +%S)))
sleep_seconds=$(( (10 - (current_minute % 10) - (current_second < 30 ? 0 : 1)) * 60 - current_second ))
  
  sleep $sleep_seconds
done