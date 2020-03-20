# Datadog alerts via pulumi

The monitor_fetch.sh script will allow you to pull an existing monitor from the datadog API and format its properties for pulumi code. 

To use, first create a monitor in the datadog UI. Then take the monitor ID from the URL of the monitor and export to your shell along with the DD API key and DD APP key.

the following variables are expected by this script:
mon_id
DD_API_KEY
DD_APPLICATION_KEY

The script will return a code block that can be added to a file in this repo for monitor creation. 
