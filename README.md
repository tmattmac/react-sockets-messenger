# Messenger App

A simple React + Express messenger app.

## Server Development Setup

*Required: Postgres, Node*

First, create or update an .env file in the root of the /server directory with the following:

```
DB_NAME=messenger_db
DB_USER=your_pg_username
DB_PASS=your_pg_password
```

Then, from the /server directory, run the following:

```
npm i                   # install dependencies
createdb messenger_db   # create new postgres database
npm run db:init         # create tables from db models
npm run dev             # start the development server
```