# Query Params Parser
MEAN stack app for parsing URL query params

I created this application because I needed a simple way to analyze URLs and modify them, ie Their query params or hash (#) and generate new ready-to-use URL.

I chose **MEAN** stack (**M**ongo **E**xpress **A**ngularJS **N**ode.js, not to mistake for http://mean.io/) because I believe that this set of technologies is already standard for modern web development, not to mention it's speed, ease of use, testability and the fact, that I really wanted to work with them :)

I started to write tests using https://karma-runner.github.io/ and http://jasmine.github.io/ but for now, they are basicaly only configured. It is a side project and my time is limited, unfortunatly... :/

> #### Small disclaimer
> This app is meant to be run on Heroku, but you should have no problem with running it anywhere else. See appropriate notes in installation process description.

What you will need (to do) in order to install and run this application:

1. `node.js` with `npm`
2. install dependencies (`Express`, `Mongoose`, `hashids`, etc.):

    Go to app source code:
    ```bash
    cd /path/to/where/you/cloned/repo
    ````

    fire up packages install for development (it will install `devDependencies` )
    ````bash
    npm install
    ````

    but if you don't want dev packages, i.e. for production environment, use:
    ````bash
    npm install --production
    ```

    or or set the `NODE_ENV` environment variable to `production`:
    ```bash
    export NODE_ENV=production
    ```

    > `NPM` will install `bower.js` and it will in turn install all frontend JS and CSS dependencies app needs using `postinstall` hook in `scripts`.
3. You need to tell app how to connect to MongoDB by setting enviroment variable named `QPP_MONGO_URI`.

  > Heroku will do this for you, if you use i.e. MongoLab addon, but all they can provide is `MONGOLAB_URI` env variable. What you need to do is copy it's conents into new env variable named `QPP_MONGO_URI`.

  Locally you can just export this variable before runnning an app with something like this:

  ```bash
  export QPP_MONGO_URI=mongodb://username:password@host/collection
  ```

  or export and run in one line:

  ```bash
  export QPP_MONGO_URI=mongodb://username:password@host/collection && node app.js
  ```
4. Second required ENV variable is `QPP_HASH_SALT`, which sets unique salt for URL hashes. In order to make things more safe it has to be different for every application and as random as you can think of :)
  ```
  export QPP_HASH_SALT=fiufgnc9oq23rmxq89rypq380fu,xq
  ```
4. By default app will run on port `5000`, but you can override this by setting `QPP_PORT` env variable.
  > Again, Heroku will do this for you, but keep in mind that `QPP_PORT` takes precenedce over `PORT`, which Heroku uses, so in that case you might want to omit it and stick with `PORT` provided by Heroku.

  ```bash
  export QPP_PORT=5000
  ```
5. Now run application using:
  * `node`:
  ```bash
  node app.js
  ```
  * Foreman (see below why it is a better way of doing this):
  ```
  foreman start
  ```

5. List of options set via ENV variables - see example `.env` file below, in **Foreman** section.
5. That's it, app should be working now. You should be able to access it by opening (using default port) `http://localhost:5000` in your web browser.
6. Tests are not there yet, but you can run them by installing `dev` packages and:

  Go into `tests` dir and run `karma` runner:

  ```bash
  cd  public/app/tests
  karma start
  ```

## Running app with Foreman
It is encoureged to run this app with [Foreman](https://github.com/ddollar/foreman) for at least two reasons:
* It reads automatically `.env` file placed in app root and gets all enviroment variables from there, so you don't have to use `export` syntax
* Heroku uses it, so it makes things more consistent among environments

> `Procfile` for foreman is already provided in repo

If you don't already have it, install it with: `gem install foreman`.

Example `.env` file (ignored by Git in this repo) with **application defaults**:

```bash
QPP_HASH_SALT=fiufgnc9oq23rmxq89rypq380fu,xq
QPP_MONGO_URI=mongodb://username:password@host/collection
QPP_PORT=5000
QPP_HASH_LENGTH=12
```

## TODOs
- [x] deployment to Heroku
- [x] using foreman
- [ ] tests, tests, tests!
- [ ] some kind of scheduler to clean URLs after fixed period of time
