const http = require ("http");
const hostname = 'localhost';
const port = 3000;
const url = require('url');


function collatzSequence(n) {
    let sequence = [];
    while (n !== 1) {
        sequence.push(n);
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
    }
    sequence.push(1);
    return sequence;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/collatz?numero=<n>' && req.method === 'GET') {
        const numero = parseInt(parsedUrl.query.numero, 10);

        if (isNaN(numero) || numero <= 0 || !Number.isInteger(numero)) {
            res.writeHead(400, { 'Content-Type': 'package/json' });
            res.end(JSON.stringify({ error: 'El número debe ser un entero positivo.' }));
            return;
        }

        const sequence = collatzSequence(numero);

        res.writeHead(200, { 'Content-Type': 'package/json' });
        res.end(JSON.stringify({ sequence }));
    } else {
        res.writeHead(400, { 'Content-Type': 'package/json' });
        res.end(JSON.stringify({ error: 'Entrada inválida.' }));
    }
});

// Iniciar el servidor
server.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});