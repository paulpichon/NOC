import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    // validando el PORT de ENV
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    MAILER_HOST: env.get('MAILER_HOST').required().asString(),
    MAILER_PORT: env.get('MAILER_PORT').required().asPortNumber(),
    MAILER_SECURE: env.get('MAILER_SECURE').required().asBool(),
    MAILER_AUTH_USER: env.get('MAILER_AUTH_USER').required().asEmailString(),
    MAILER_AUTH_PASSWORD: env.get('MAILER_AUTH_PASSWORD').required().asString(),
    PROD:env.get('PROD').required().asBool(),
    // mongo db
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MOGNO_DB_NAME: env.get('MOGNO_DB_NAME').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),


}