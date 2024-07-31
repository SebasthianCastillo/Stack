import { createServer } from 'node:http';
import pkg from 'pg';
const { Pool } = pkg;

const server = createServer((req, res) => {
    if (req.url === '/dbz') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, { 'Content-Type': 'application/json' });

        const pkg = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'Ki',
            password: '1234',
            port: 5432, // default PostgreSQL port
          });
        
        // res.end(JSON.stringify(jsonData, null, 2));
        pkg.query('SELECT * FROM personajes', (err, result) => {
          if (err) {
            res.end(JSON.stringify({ error: err.message }));
          } else {
            res.end(JSON.stringify(result.rows, null, 2));
          }
        });
       
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
      }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});