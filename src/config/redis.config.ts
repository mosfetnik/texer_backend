import RedisMod from 'ioredis';
const Redis = RedisMod.default;

const redis = new Redis({
  host: "localhost",
  port: 6379,
  password:'mypassword'
});

export default redis;
