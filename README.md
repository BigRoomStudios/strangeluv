# strangeluv

> How I Learned to Stop Worrying and Love React

[![Build Status](https://travis-ci.org/BigRoomStudios/strangeluv.svg?branch=master)](https://travis-ci.org/BigRoomStudios/strangeluv?branch=master)
[![dependencies](https://david-dm.org/BigRoomStudios/strangeluv.svg)](https://david-dm.org/BigRoomStudios/strangeluv)
[![devDependency Status](https://david-dm.org/BigRoomStudios/strangeluv/dev-status.svg)](https://david-dm.org/BigRoomStudios/strangeluv#info=devDependencies)

Here you find a fork of [this](https://github.com/davezuko/react-redux-starter-kit) React/Redux starter kit.  We've made it our own.  You'll find React, Redux, and a dope Webpack build system that's already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, etc.  Ships with a hapi server and plugin for arbitrarily siiick deployments.  We'll tell you where to put files and make things easy whenever possible.

## Table of Contents
1. [Toolset](#toolset)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Build System](#build-system)
1. [Thank You](#thank-you)

## Toolset
* [strangeluv-core](https://github.com/BigRoomStudios/strangeluv-core)
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
* node `6.x.x`
* npm `3.x.x`

## Getting Started
```bash
$ git clone https://github.com/BigRoomStudios/strangeluv
$ mv strangeluv my-project
$ cd my-project   # Then adjust package.json and readme as necessary
$ npm install     # Install project dependencies
$ npm start       # Compile and launch
```

If all goes well you should see something like this,
```
| app:config Creating default configuration. +0ms
| app:config Looking for environment overrides for NODE_ENV "dev". +2ms
| app:config Found overrides, applying to default configuration. +1ms
| app:webpack:config Create configuration. +0ms
| app:webpack:config Enable plugins for live development (HMR, NoErrors). +1ms
| app:bin:server Server is now running at http://0.0.0.0:3000. +125ms
```

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to `dist/`.|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`dev:no-debug`|Same as `npm run dev` but disables devtool instrumentation.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "dev".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|

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
│   ├── styles/              # Application-wide styles
│   ├── wiring/              # Wiring between Redux and the app
│   └── routes/              # Main route definitions and async split points
│       ├── index.js         # Bootstrap main application routes with store
│       └── Home/            # Fractal route
│           ├── index.js     # Route definitions and async split points
│           ├── $$$/         # Any folders you might find under src/ like reducers/, etc.
│           └── routes/      # Nested sub-routes
└── tests                    # Unit tests
```

### Reducer wiring
Reducers placed in `reducers/` are automatically registered to the Redux store using some automatic wiring found in [strangeluv-core](https://github.com/BigRoomStudios/strangeluv-core).  Reducers can be injected asynchronously (usually for code-splitting within a child route) as such,
```js
const Reducers = require('wiring/reducers');

// Let store be the app's store and myReducer be a new reducer

Reducers.inject(store, { key: 'reducerName', reducer: myReducer });
```

### A note on file- and directory-naming
Files should be named with `dash-case.js` except in the case of containers or components, which should use `PascalCase.js`.  This includes reducer, action, and action-type files.  Filenames need not repeat information specified by their directory names.  For example, `containers/Counter.js` or `containers/Counter/index.js` are preferred over `containers/CounterContainer.js` or `containers/CounterContainer/CounterContainer.js`.  The container may still be required into a file using the "full name" e.g.,
```js
const CounterContainer = require('./containers/Counter');
```

Omitting the `.js` extension in calls to `require()` is preferred, as it allows one to transition a simple module at `components/Counter.js` to a complex module with its own internals at `components/Counter/index.js` without affecting how it is referenced.

## Development
### Style
We favor the [hapi style guide](hapijs.com/styleguide).  Yes, even when coding for the browser!  The idea is to maintain fluency for developers who work both on the server and in the browser.  It is supposed to be the same language, after all!  Node and V8 move fast enough on their own, so we plan to keep up-to-date with that ecosystem rather than the hyperspeed with which transpilers make available incompletely-spec'd JS features.  It's worth noting that for the time being that includes ES6 modules.  We additionally have some standard React lint rules.  Just `npm run lint` to see how you're doing!

### Developer Tools
Works nicely with the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) and [React DevTools Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).  `npm run dev` will enable the tools automatically, while `npm run dev:no-debug` will not.

### Routing
We use `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

### Recipes
 - Incorporating forms using [react-redux-form](https://github.com/davidkpiano/react-redux-form) [[here](https://github.com/BigRoomStudios/strangeluv/compare/recipe-forms)]
 - Deployment alongside the [hapi boilerplate](https://github.com/devinivy/boilerplate-api) [[here](https://github.com/devinivy/boilerplate-api/compare/recipe-strangeluv)]
 - Incorporating an "initial load" of state with an API call [[here](https://github.com/BigRoomStudios/strangeluv/compare/recipe-initial-load
)]
 - Incorporating server-side rendering (_very, very incomplete_) [[here](https://github.com/BigRoomStudios/strangeluv/compare/recipe-server-side
)]

## Testing
To add a unit test, simply create a `.spec.js` file anywhere in `tests/`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. If you are using `redux-cli`, test files should automatically be generated when you create a component or redux module.

If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `config/main.js`.

## Deployment
### For development (`npm run dev`)
Runs a hapi server with Webpack HMR and development middleware.  Serves `src/static/` for static assets.

### For production
You can serve `dist/`, a complete app distribution generated by `npm run deploy`, by running `NODE_ENV=production npm start`.

### As a hapi plugin
Both development and production modes are supported when using a strangeluv project as a hapi plugin.  See [this hapi boilerplate recipe](https://github.com/devinivy/boilerplate-api/compare/recipe-strangeluv) for an example.

## Build System
### Configuration
Default project configuration can be found in `config/main.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the actual webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), you can edit `config/environments.js` and define overrides on a per-NODE_ENV basis. There are examples for both `dev` and `production`, so use those as guidelines. Here are some common configuration options:

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
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `src/` directory. It should only be used inside the routes/ directory in order to avoid arbitrarily deep directory traversal (`../` ad infinitum).  Here's an example,

```js
// current file: src/routes/some/nested/View.js
// What used to be this,
const SomeComponent = require('../../../components/SomeComponent');

// Can be this,
const SomeComponent = require('components/SomeComponent'); // Hooray!
```

### Globals
These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `config/main.js`. When adding new globals, make sure you also add them to `.eslintrc`.

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
This starter kit comes packaged with an hapi server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement. Using a custom hapi plugin in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server) makes it easier to extend the starter kit to include functionality such as API's, universal rendering, etc.  See also the section on [deployment](#deployment).

### Production Optimization
Babel is configured to use [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined. Additionally, in production, we use [react-optimize](https://github.com/thejameskyle/babel-react-optimize) to further optimize your React code.

In production, webpack will extract styles to a `.css` file, minify your JavaScript, and perform additional optimizations such as module deduplication.

## Thank You
* [Dave Zuko](https://github.com/davezuko) - for creating the [boilerplate](https://github.com/davezuko/react-redux-starter-kit) that we forked (at v3).  It contains a huge amount of effort from dozens of collaborators, and made for a fantastic start.
