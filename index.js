import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})
await fastify.register(import('fastify-raw-body'), {
    field: 'rawBody', // change the default request.rawBody property name
    global: false, // add the rawBody to every request. **Default true**
    encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
    runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
    routes: [] // array of routes, **`global`** will be ignored, wildcard routes not supported
})
fastify.register(import('./routes/main.js'));

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