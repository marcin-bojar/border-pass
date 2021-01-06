const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');

const bundler = new Bundler('./src/index.html');
const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000' }));
app.use(bundler.middleware());

app.listen(1234);
