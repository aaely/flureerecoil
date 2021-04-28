const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/auth/spotify', { target: process.env.PROXY_ADDRESS, changeOrigin: true }));
    app.use(createProxyMiddleware('/auth/spotify/callback', { target: process.env.PROXY_ADDRESS, changeOrigin: true }));
    app.use(createProxyMiddleware('/auth/google', { target: process.env.PROXY_ADDRESS, changeOrigin: true }));
    app.use(createProxyMiddleware('/auth/google/callback', { target: process.env.PROXY_ADDRESS, changeOrigin: true }));
    app.use(createProxyMiddleware('/api/db/aaely/dispensary/query', { target: process.env.PROXY_ADDRESS, changeOrigin: true }));
    app.use(createProxyMiddleware('/api/db/aaely/dispensary/transact', { target: process.env.PROXY_ADDRESS, changeOrigin: true }));
    app.use(createProxyMiddleware('/api/current_user', { target: process.env.PROXY_ADDRESS, changeOrigin: true }));
};