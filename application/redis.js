import { createClient, RedisClient } from "redis";
import envConf from '../config/envConf.js';

const client = createClient({
    url: envConf.redisURL
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

client.connect();

export default client;