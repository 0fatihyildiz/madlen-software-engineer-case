# Madlen Software Engineering Case Study

This repository contains the solution to the Madlen Software Engineering Case Study. The solution is divided into two main parts:
Client and Server. [Production](https://madlen-case.binesto.com), [Figma](https://www.figma.com/design/7dgxET1HEUOQBTQCv7wnaH/Madlen-Software-Engineer-Case?node-id=1-53205&t=Uct2Bb3Q5WIoolEx-1)

## Client
[Client](client/README.md) is a React application that provides a user interface for managing questions, metadata, and model answers. It allows users to view, update, and delete questions, metadata, and model answers.

## Server
[Server](server/README.md) is a backend service that handles the management of metadata, questions, model answers, and supporting evidence using PostgreSQL as the database. It is built with NitroJS, DrizzleORM, and PostgreSQL driver for seamless handling of database interactions. also zod is used for validation of request body.

## Technologies Used
- **NitroJS**: A minimalistic backend framework that provides server-side logic for the application.
- **DrizzleORM**: A TypeScript-first ORM for interacting with PostgreSQL, enabling type-safe SQL queries and schema definitions.
- **PostgreSQL**: A powerful relational database used for storing the application's data.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing to the language.
- **Vite**: A build tool that provides a fast development environment for modern web projects.
- **PNPM**: A fast, disk space-efficient package manager that uses hard links and symlinks to save space.

## Getting Started
To get a local copy up and running follow these simple steps.

```bash
git clone https://github.com/0fatihyildiz/madlen-software-engineer-case.git

cd madlen-software-engineer-case

docker-compose up --build
```

## Ports
- **Client**: http://localhost:3050
- **Server**: http://localhost:3051