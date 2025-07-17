# anison-crud

# Anison CRUD Application

This is a simple CRUD application for managing songs, built with Express.js. It allows users to create, read, update, and delete songs, with features such as sorting and searching.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/anison-crud.git
    ```

2. Navigate to the project directory:
    ```bash
     cd anison-crud
    ```
3. Install the dependencies:
    ```bash
    yarn
    ```
4. Create a `.env` file in the root directory and set the following environment variables:
    ```plaintext
    PORT=8888
    DB_ADDR=mongodb://localhost:27017/
    ```
5. Start the application:
    ```bash
    yarn start
    ```
6. Open your browser and navigate to `http://localhost:8888/songs` to access the application.

## Features

-   Create, read, update, and delete songs
-   Sort songs by title
