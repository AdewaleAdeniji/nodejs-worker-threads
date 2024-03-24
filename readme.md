# Worker thread implementation

## Description

This codebase contains an implementation of the worker threads in javascript.
Problem: We have an endpoint for computing the details of bank statements, but this can take a long long time if the bank statement contains a lot of data, so we implemented worker threads to handle the computation of the bank statement in the background.

## Features

- Get Bank statement by key
- Import Bank Statement
- Cached DB implementation

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`  

## Usage

1. Run the project using `npm start` / `nodemon`.
2. Open your browser and navigate to `http://localhost:9000`.

## Contributing

Contributions are welcome! Please follow the guidelines in [CONTRIBUTING.md](link-to-contributing-file).

## License

This project is licensed under the [MIT License](link-to-license-file).