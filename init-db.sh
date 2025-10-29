#!/bin/bash

# Wait for MySQL to start
sleep 15

# Create database if not exists
mysql -u root -e "CREATE DATABASE IF NOT EXISTS setu;"

# Set root password
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'Vishal#33';"

# Keep the script running (though supervisord will handle)
tail -f /dev/null