#!/bin/bash

if [ -z $DD_API_KEY ] 
then
  echo "DD_API_KEY must be set"
  exit

elif [ -z $DD_APPLICATION_KEY ]
then
  echo "DD_APPLICATION_KEY must be set"
  exit

elif [ -z $mon_id ]
then
  echo "mon_id must be set"
  exit
fi

for i in query type name message
  do export $i="$(curl -s "https://api.datadoghq.com/api/v1/monitor/$mon_id"    -H "DD-API-KEY: $DD_API_KEY"     -H "DD-APPLICATION-KEY: $DD_APPLICATION_KEY" | jq .$i)"
done

printf "\nexport const monitorNameREPLACE = new datadog.Monitor('monitorNameREPLACE', {"
printf "\n  name: $name,\n  query: $query,\n  type: $type,\n  message: $message,\n});\n\n" | sed -e "s/'/\\\'/g" | sed "s/\"/'/g"
