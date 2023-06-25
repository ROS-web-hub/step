### Requeriments

In order to execute this project you must have:

* Nodejs installed
* **Postgresql**, You need postgresql running, you can see the sql table, in `/database/db.sql`

In the database/db.sql,  you should run all query command.

### Installation

```
git clone https://github.com/FaztWeb/nextjs-postgres-crud-typescript
cd nextjs-postgres-crud-typescript
npm install
npm run dev
```
And then you should confirm about following;

1. installing postgresql
2.    - DATABASE_HOST=127.0.0.1
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=1234&qwer
      - POSTGRES_DB=tasksdb

You can implement postman.
After you run my project,  if you input like this "post localhost:3000/api/test?value=1489&value2=714", you can see the result as json format.
