const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackDevConfig = require('./webpack-dev.config');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT;
const app = express();

app.set('view engine', 'html');

if (isDeveloping) {
  const compiler = webpack(webpackDevConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    contentBase: __dirname,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
    // display no info to console (only warnings and errors)
    noInfo: false,

    quiet: false, // display nothing to the console

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: false,

    // watch options (only lazy: false)
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },

    // // public path to bind the middleware to
    // // use the same as in webpack
    // publicPath: "/assets/",

    // The index path for web server, defaults to "index.html".
    // If falsy (but not undefined), the server will not respond to requests to the root URL.
    index: "index.html",

    // custom headers
    headers: { "X-Custom-Header": "yes" },

    // Add custom mime/extension mappings
    // https://github.com/broofa/node-mime#mimedefine
    // https://github.com/webpack/webpack-dev-middleware/pull/150
    // mimeTypes: { "text/html": [ "phtml" ] },

    // Provide a custom reporter to change the way how logs are shown.
    reporter: null,

    // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
    serverSideRender: false,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist-dev/index.html')));
    res.end();
  });
} else {
  const dist = process.env.DEPLOY !== 'true' ? 'dist-prod' : 'dist-dep';
  app.use(express.static(`${__dirname}/${dist}`));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `${dist}/index.html`));
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
