const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');

const proxy = httpProxy.createProxyServer();
const app = express();

app.use(cors());

app.all('/register/*', (req, res) => {
  proxy.web(req, res, { target: 'http://3.38.62.245:8080' });
});

app.post('/device/register/newdevice', (req, res) => {
  proxy.web(req, res, { target: 'http://3.38.62.245:8080' });
});

app.patch('/device/register/plant', (req, res) => {
  proxy.web(req, res, { target: 'http://3.38.62.245:8080' });
});

app.all('/device/load/all', (req, res) => {
  proxy.web(req, res, { target: 'http://3.38.62.245:8080' });
});

app.all('/device/load/one', (req, res) => {
  proxy.web(req, res, { target: 'http://3.38.62.245:8080' });
});
app.all('/dataout/total', (req, res) => {
  proxy.web(req, res, { target: 'http://3.38.62.245:8080' });
});
app.all('/device/remove', (req, res) => {
  proxy.web(req, res, { target: 'http://3.38.62.245:8080' });
});
app.all('/dataout/image', (req, res) => {
  proxy.web(req, res, { target: 'http://3.38.62.245:8080' });
});

// app.all('/device/load/one', (req, res) => {
//   const deviceId = req.query.deviceId;
//   const url = `http://3.38.62.245:8080/device/load/one?deviceId=${deviceId}`;
//   proxy.web(req, res, { target: url });
// });

// app.get('/device/load/one/:deviceId', (req, res) => {
//   const deviceId = req.params.deviceId;
//   proxy.web(req, res, {
//     target: `http://3.38.62.245:8080/device/load/one?deviceId=${deviceId}`,
//   });
// });

app.listen(8080, () => {
  console.log('Proxy server is running on port 8080');
});
