const jsdom = require('jsdom');

// Set up testing environment to run like a browser in the command line
const head = '<head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></head>';
const domStr = `<!doctype html><html>${head}<body><div id="root"></div></body></html>`;
const dom = new jsdom.JSDOM(domStr, { url: 'http://localhost:3020' });

global.document = dom.window.document;
global.window = document.defaultView;
global.history = null;

global.window.localStorage = { accessToken: 'c2db4cb4d6b5d4e1cbbd4e2f1d26b8cd7fec1ba9' };
var localStorage = global.window.localStorage;
