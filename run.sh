

#!/bin/bash
 
# Function to start JSON server
start_json_server() {
    echo "Starting JSON Server..."
    json-server --watch ./src/assets/Data/userData.json --port 3000 &
    JSON_SERVER_PID=$!
}
 
# Function to stop JSON server
stop_json_server() {
    echo "Stopping JSON Server..."
    kill $JSON_SERVER_PID
}
 
# Function to start Angular application
start_angular_app() {
    echo "Starting Angular Application..."
    ng serve --open &
    ANGULAR_SERVER_PID=$!
}
 
# Function to stop Angular application
stop_angular_app() {
    echo "Stopping Angular Application..."
    kill $ANGULAR_SERVER_PID
}
 
# Function to handle clean-up
cleanup() {
    stop_angular_app
    stop_json_server
    exit 0
}
 
# Set trap to call cleanup function on exit
trap cleanup EXIT
 
# Main function
main() {
    start_json_server
    start_angular_app
 
    # Wait for user input to stop the servers
    read -p "Press any key to stop servers..."
}
 
# Execute main function
main