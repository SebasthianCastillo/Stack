import { createServer } from 'node:http';
import { Pool } from 'pg';
const server = createServer((req, res) => {
    if (req.url === '/dbz') {
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const pool = new Pool({
            user: 'your-username',
            host: 'your-host',
            database: 'your-database',
            password: 'your-password',
            port: 5432, // default PostgreSQL port
        });
        // res.end(JSON.stringify(jsonData, null, 2));
        res.end('as');
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
    }
});
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
//# sourceMappingURL=server.js.map