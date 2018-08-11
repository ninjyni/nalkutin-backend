# A small todo/nagger web app

This is a web app for keeping track of recurring tasks and when they were last completed.

### Current features

Backend sends a JSON response or renders a view template, depending on request type.

##### Tasks

* List all tasks
* Add new task\*
* Update task's last completion time
* Delete a task

\*Only for authenticated users. Authentication implemented just for learning purposes.

##### Users

* Create a new user
* Login
* JWT authentication

### Application

#### Libraries

* Built with [Express](https://expressjs.com/) framework. Application skeleton generated with `express-generator`.
* [Passport](http://www.passportjs.org) for user authentication.
* [Sequelize](http://docs.sequelizejs.com) for ORM.
* [Pug](https://pugjs.org) as template engine.

#### Postman

The `postman` folder contains Postman collection and environment for testing REST calls.

#### Related

See [nalkutin](https://github.com/ninjyni/nalkutin) for nalkutin Android app.
