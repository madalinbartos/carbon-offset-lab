const config = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: (process.env.NODE_ENV || 'development') !== 'production',
  migrationsRun: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  subscribers: ['dist/db/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'db/migrations',
    subscribersDir: 'db/subscriber',
  },
};

if (process.env.NODE_ENV === 'production') {
  config.ssl = true;
  config.extra = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

module.exports = config;
