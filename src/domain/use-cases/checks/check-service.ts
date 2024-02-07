// interfaz
interface CheckServiceUseCase {
    // definimos nuestro metodo execute()
    execute( url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
    // metodos
    async execute( url: string ): Promise<boolean>  {

        try {
            const req = await fetch( url );
            // verificamos
            if ( !req.ok ) {
                throw new Error(`Error on check service ${url}`);
            }

            // mensaje
            console.log(`${url} is ok`);
            
            return true;

        } catch (error) {
            console.log(`${error}`);
            
            return false;
        }

    }

}