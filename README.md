### Requeriments

In order to execute this project you must have:

* Nodejs installed
* **Postgresql**, You need postgresql running, you can see the sql table, in `/database/db.sql`

In the database/db.sql,  you should run all query command.

### Installation

```
git clone https://github.com/FaztWeb/nextjs-postgres-crud-typescript
cd nextjs-postgres-crud-typescript
yarn install
yarn run dev
```
And then you should confirm about following;

With navicat 15 or 16, you can create database(tasksdb).

1. installing postgresql 
2.    - DATABASE_HOST=127.0.0.1
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=1234&qwer
      - POSTGRES_DB=tasksdb

You can use postman.
I deployed the project 77.91.102.202:3000.
