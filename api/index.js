import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})
await fastify.register(import('fastify-raw-body'), {
    field: 'rawBody',
    global: false,
    encoding: 'utf8',
    runFirst: true,
    routes: []
})
fastify.register(import('../src/main.js'));

const port = 80;

const start = async () => {
    try {
        await fastify.listen({ port });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();