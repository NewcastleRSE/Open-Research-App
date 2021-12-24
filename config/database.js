module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'open-research-data'),
      user: env('DATABASE_USERNAME', 'sam'),
      password: env('DATABASE_PASSWORD', 'password1'),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
