import dotenv from 'dotenv';
import { httpClient } from '../config/config.js';
dotenv.config();

async function api(fastify, _options, done) {
    fastify.get('/', (_req, reply) => {
        reply.code(200).send({ status: true, message: 'Server is running...' });
    });
    fastify.post('/upload', {
        config: {
            rawBody: true
        },
        async handler(req, reply) {
            const body = JSON.parse(req.rawBody);
            if (!body.image) {
                reply.code(404).send({ status: false, message: 'No image passed via body.' });
            }
            else {
                await httpClient.post('/describe', {
                    tkn: getKey(),
                    modelVersion: '1.0_full',
                    input: body.image,
                    visionParams: 'description,gpt'
                }).catch(function (error) {
                    console.log(error);
                    reply.code(404).send({ status: false, message: 'Failed to recognize the image.' });
                }).then(function (response) {
                    const data = response.data;
                    if (data.status != 'success') {
                        console.log(data);
                        reply.code(404).send({ status: false, message: 'Failed to recognize the image.' });
                    }
                    else {
                        reply.code(200).send({ status: true, message: data.caption_GPTS });
                    }
                });
            }
        }
    })
    done();
}

function getKey() {
    let key = "";
    switch (getRandomInt(1, 4)) {
        case 1: key = process.env.KEY1;
        case 2: key = process.env.KEY2;
        case 3: key = process.env.KEY3;
        case 4: key = process.env.KEY4;
    }
    return key;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default routes;