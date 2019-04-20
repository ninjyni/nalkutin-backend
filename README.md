# A simple REST backend for todo/nagger apps

Allows keeping track of recurring tasks and when they were last completed.

### Features

##### Tasks

- List all tasks
- Add new task\*
- Update task's last completion time
- Delete a task\*

\*Only for authenticated users.

##### Users

- Create a new user
- Login
- JWT authentication

### Application

#### Libraries

- Built with [Express](https://expressjs.com/) framework. Application skeleton generated with `express-generator`.
- [Passport](http://www.passportjs.org) for user authentication.
- [Sequelize](http://docs.sequelizejs.com) for ORM.

#### Postman

The `postman` folder contains Postman collection and environment for testing REST calls.
