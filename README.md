# Film Finder

Film Finder is a simple application designed to display information about movies.

## Getting Started

To get started with Film Finder, ensure you have Docker and Docker Compose installed on your system.

1.  Navigate to the root directory of the Film Finder project in your terminal.
2.  Run the following command to build the Docker containers:

    ```bash
    docker compose build
    docker compose run --rm backend npm run migration
    docker compose up
    ```