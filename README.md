# whatever

Here you find a fork of [this](https://github.com/davezuko/react-redux-starter-kit) starter kit.  We've made it our own.  You'll find React, Redux, and a dope Webpack build system that's already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, etc.  Ships with a hapi server and plugin for arbitrarily siiick deployments.  We'll tell you where to put files and make things easy whenever possible.

## Table of Contents
1. [Toolset](#toolset)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
  1. [Developer Tools](#developer-tools)
  1. [Routing](#routing)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Build System](#build-system)
  1. [Configuration](#configuration)
  1. [Root Resolve](#root-resolve)
  1. [Globals](#globals)
  1. [Styles](#styles)
  1. [Server](#server)
  1. [Production Optimization](#production-optimization)
1. [Thank You](#thank-you)

## Toolset
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [react-router-redux](https://github.com/rackt/react-router-redux)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [hapi](https://github.com/hapijs/hapi)
* [karma](https://github.com/karma-runner/karma)
* [eslint](http://eslint.org)

## Requirements
* node `^6.0.0`
* npm `^3.0.0`

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can follow these steps to get the project up and running:

```bash
$ git clone https://github.com/this/repo
$ cd this-repo
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```

If everything works, you should see the following:

<img src="http://i.imgur.com/zR7VRG6.png?2" />

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`dev:no-debug`|Same as `npm run dev` but disables devtool instrumentation.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "dev".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Application Structure

Note the [nestable `routes/`](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure).

```
.
├── bin/                     # Build/start scripts
├── blueprints/              # Blueprint files for redux-cli
├── config/                  # Project configuration settings
├── server/                  # hapi application (uses webpack middleware)
│   └── index.js             # Server entry point
│   └── plugin.js            # hapi plugin for arbitrary hapi deploy
├── src/                     # Application source code
│   ├── main.js              # Application bootstrap and rendering
│   ├── action-types/        # Action types
│   ├── actions/             # Action creators
│   ├── reducers/            # Redux reducers
│   ├── components/          # Reusable UI-only (dumb/stateless) components
│   ├── containers/          # Reusable container (smart/stateful) components
│   ├── layouts/             # Components that dictate major page structure
│   ├── static/              # Static assets (not imported anywhere in source code)
│   ├── styles/              # Application-wide styles (generally settings)
│   ├── wiring/              # Wiring between Redux, routing, and the app
│   └── routes/              # Main route definitions and async split points
│       ├── index.js         # Bootstrap main application routes with store
│       └── Home/            # Fractal route
│           ├── index.js     # Route definitions and async split points
│           ├── $$$/         # Any folders you might find under src/ like reducers/, etc.
│           └── routes/      # Nested sub-routes
└── tests                    # Unit tests
```

## Development

#### Developer Tools

Works nicely with the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) and [React DevTools Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).  `npm run dev` will enable the tools automatically, while `npm run dev:no-debug` will not.

### Routing
We use `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Testing
To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. If you are using `redux-cli`, test files should automatically be generated when you create a component or redux module.

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/main.js`.

## Deployment
Out of the box, this starter kit is deployable by serving the `~/dist` folder generated by `npm run deploy` (make sure to specify your target `NODE_ENV` as well). This project does not concern itself with the details of server-side rendering or API structure, since that demands an opinionated structure that makes it difficult to extend the starter kit.

### Static Deployments
If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router take care of the rest. The hapi server that comes with the starter kit is able to be extended to serve as an API or whatever else you need, but that's entirely up to you.

## Build System

### Configuration

Default project configuration can be found in `~/config/main.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the actual webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), you can edit `~/config/environments.js` and define overrides on a per-NODE_ENV basis. There are examples for both `dev` and `production`, so use those as guidelines. Here are some common configuration options:

|Key|Description|
|---|-----------|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the hapi server|
|`server_port`|port for the hapi server|
|`compiler_css_modules`|whether or not to enable CSS modules|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|


### Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. It should only be used inside the routes/ directory in order to avoid arbitrarily deep directory traversal (`../` ad infinitum).  Here's an example,

```js
// current file: ~/src/routes/some/nested/View.js
// What used to be this,
const SomeComponent = require('../../../components/SomeComponent');

// Can be this,
const SomeComponent = require('components/SomeComponent'); // Hooray!
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/main.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `dev`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|
|`__DEBUG__`|True when `process.env.NODE_ENV` is `dev` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)|
|`__BASENAME__`|[history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)|

### Styles

Both `.scss` and `.css` file extensions are supported out of the box and are configured to use [CSS Modules](https://github.com/css-modules/css-modules). After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

### Server

This starter kit comes packaged with an hapi server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement. Using a custom hapi plugin in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server) makes it easier to extend the starter kit to include functionality such as API's, universal rendering, and more -- all without bloating the base boilerplate.

### Production Optimization

Babel is configured to use [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined. Additionally, in production, we use [react-optimize](https://github.com/thejameskyle/babel-react-optimize) to further optimize your React code.

In production, webpack will extract styles to a `.css` file, minify your JavaScript, and perform additional optimizations such as module deduplication.

## Thank You

* [Dave Zuko](https://github.com/davezuko) - for creating the [boilerplate](https://github.com/davezuko/react-redux-starter-kit) that we forked (at v3).  It contains a huge amount of effort from dozens of collaborators, and made for a fantastic start.
