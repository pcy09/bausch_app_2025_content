// 통드민
const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'; // NODE_ENV에 따라 dev 모드 설정
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(3007, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3007');
  });
});
