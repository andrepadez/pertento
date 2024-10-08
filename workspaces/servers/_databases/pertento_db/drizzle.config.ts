const { POSTGRES_URL = 'postgres://postgres:postgres@localhost:5432/pertento' } = process.env;

export default {
  schema: './schema/index.ts',
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: POSTGRES_URL,
  },
};
