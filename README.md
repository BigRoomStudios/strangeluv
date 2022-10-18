# strangeluv

> How I Learned to Stop Worrying and Love React

[![Build Status](https://travis-ci.org/BigRoomStudios/strangeluv.svg?branch=strangeluv)](https://travis-ci.org/BigRoomStudios/strangeluv?branch=strangeluv)
[![dependencies](https://status.david-dm.org/gh/BigRoomStudios/strangeluv.svg?ref=strangeluv)](https://david-dm.org/BigRoomStudios/strangeluv/strangeluv)
[![devDependency Status](https://status.david-dm.org/gh/BigRoomStudios/strangeluv.svg?ref=strangeluv&type=dev)](https://david-dm.org/BigRoomStudios/strangeluv/strangeluv#info=devDependencies)

Strangeluv is an opinionated, curated set of tools for building React applications.

 - *UI* - `react` `react-dom`
 - *Styles & Design* - `styled-components` `@material-ui/core` `@material-ui/styles`
 - *State* - `redux` `react-redux` `redux-thunk` `strange-middle-end` `normalizr` `immer`
 - *Routing* - `react-router` `react-router-dom` `connected-react-router` `strange-router` `history`
 - *Errors* - `react-error-boundary` `error-overlay-webpack-plugin`
 - *Builds* - `webpack` `html-webpack-plugin` `copy-webpack-plugin` `file-loader` `@babel/core` `babel-preset-react-app`
 - *Production server* - `@hapi/hapi` `@hapi/inert`
 - *Development server* - `webpack-dev-server`
 - *HMR* - `react-hot-loader` `@hot-loader/react-dom`
 - *Tests* - `jest` `@testing-library/react`
 - *Lint* - `eslint` `@hapi/eslint-config-hapi` `eslint-config-standard-react`

## Requirements
* node `14.x.x`

## Getting Started
Click the green "Use this template" button above or install manually using git:

```bash
$ git clone --depth=1 --origin=strangeluv --branch=strangeluv git@github.com:bigroomstudios/strangeluv.git my-project
$ cd my-project
$ git checkout --orphan master  # New branch without history
$ npm install                   # Install all dependencies
$ npm start                     # Start development server
```

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000` via webpack-dev-server.|
|`build`|Compile the application to `build/` for production.|
|`build:dev`|Compile the application to `build/`, overriding `NODE_ENV` to "development".|
|`clean`|Remove the `build/` folder.|
|`test`|Run tests with Jest.|
|`serve`|Run production server.|
|`serve:dev`|Run production server, overriding `NODE_ENV` to "development".|
|`lint`|Lint all javascript in the repository.|

## Application Structure
```
.
├── config/                  # Project configuration settings
│   └── index.js             # Configuration entrypoint
├── server/                  # hapi server/plugin for production
│   ├── index.js             # Server entrypoint
│   └── plugin.js            # hapi plugin for arbitrary hapi deploy
└── src/                     # Application source code
    ├── index.js             # Application bootstrap and rendering
    ├── middle-end/          # Middle-end, i.e. redux and strange-middle-end
    ├── components/          # Reusable UI-only (dumb/stateless) components
    ├── containers/          # Reusable container (smart/stateful) components
    ├── public/              # Static assets (not imported anywhere in source code)
    └── routes/              # Route definitions
        ├── index.js         # Routing configuration
        └── home/            # Route-specific directory
            ├── index.js     # Route-specific routing configuration (optional)
            ├── components/  # Route-specific components
            └── containers/  # Route-specific containers
```

### A note on file- and directory-naming
Files should be named with `dash-case.js` except in the case of containers or components, which should use `PascalCase.js`.  This includes reducer, action, and action-type files.  Filenames need not repeat information specified by their directory names.  For example, `containers/Counter.js` or `containers/Counter/index.js` are preferred over `containers/CounterContainer.js` or `containers/CounterContainer/CounterContainer.js`.  The container may still be required into a file using the "full name" e.g.,
```js
const CounterContainer = require('./containers/Counter');
```

Omitting the `.js` extension in calls to `require()` is preferred, as it allows one to transition a simple module at `components/Counter.js` to a complex module with its own internals at `components/Counter/index.js` without affecting how it is referenced.

## Development
### Style
We favor the [hapi style guide](https://hapijs.com/styleguide).  Yes, even when coding for the browser!  The idea is to maintain fluency for developers who work both on the server and in the browser.  It is supposed to be the same language, after all!  Node and V8 move fast enough on their own, so we plan to keep up-to-date with that ecosystem rather than the hyperspeed with which transpilers make available incompletely-spec'd JS features.  It's worth noting that for the time being that includes ES6 modules.  We additionally have some standard React lint rules.  Just `npm run lint` to see how you're doing!

### Developer Tools
Works nicely with the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) and [React DevTools Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

## Testing
Tests are automatically picked-up by Jest.  You may add tests under any directory named `__test__` or in files suffixed `.spec.js` or `.test.js`.  If you wish to run a coverage report, run `npm test -- --coverage`.

## Deployment

### For development (`npm start`)
Runs webpack-dev-server with HMR enabled.

### For production (`npm run serve`)
Runs a hapi server located in `server/` setup to serve the `build/` directory plugin some logic to handle routing to work with client-side routing via the history API.

### As a hapi plugin
The production deployment can also be served as a hapi plugin, located in `server/plugin.js`.

## Thank You
* [Dave Zuko](https://github.com/davezuko) - for creating the [boilerplate](https://github.com/davezuko/react-redux-starter-kit) that we forked (at v3).  It contains a huge amount of effort from dozens of collaborators, and made for a fantastic start.
* [create-react-app](https://github.com/facebook/create-react-app) - We took many cues from create-react-app while choosing and configuring the tooling for strangeluv v2.
