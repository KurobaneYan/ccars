# ccars

## About

It's a simple spa with kendo ui (for courses)

## How to run

This project requires mongodb, node, npm(or yarn).

```sh
$ npm install
```

Or

```
$ yarn install
```
Init db

```sh
$ node initDB.js
```

Then build new frontend with webpack

```sh
./node_modules/webpack/bin/webpack.js
```

And run a server with npm

```sh
$ npm start
```

or run it with yarn

```sh
$ yarn start
```


## Important!

you should add file cloudinary.config.js to the project dir, for example:

```js
let config = {
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
}

module.exports = config
```
