import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {

    test('should be return env options', () => {
        
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'paulmessi10.pp@gmail.com',
            MAILER_SECRET_KEY: 'ltwrllzcfbnfpfae',
            MAILER_HOST: 'smtp.titan.email',
            MAILER_PORT: 465,
            MAILER_SECURE: true,
            MAILER_AUTH_USER: 'info@aquiestoy.mx',
            MAILER_AUTH_PASSWORD: 'barcelona19421992!',
            PROD: false,
            MONGO_URL: 'mongodb://paul:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'paul',
            MONGO_PASS: '123456789'
        });
        
    });

    test('should return error if not found env', async () => {
        // resetear el module
        jest.resetModules();
        console.log( process.env.PORT = 'ABC');
        
        try {
            await import('./envs.plugin');
            // si la siguiente condicion se lanza mostraria un error
            expect( true ).toBe( false );
        } catch (error) {
            // console.log( error );
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    });

});