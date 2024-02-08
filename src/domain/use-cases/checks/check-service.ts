// interfaz
interface CheckServiceUseCase {
    // definimos nuestro metodo execute()
    execute( url: string): Promise<boolean>;
}

// creacion de 2 types
type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;


export class CheckService implements CheckServiceUseCase {

    // inyenccion de dependencias
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    // metodos
    async execute( url: string ): Promise<boolean>  {

        try {
            const req = await fetch( url );
            // verificamos
            if ( !req.ok ) {
                throw new Error(`Error on check service ${url}`);
            }

            this.successCallback();            
            return true;

        } catch (error) {
            console.log(`${error}`);
            
            this.errorCallback(`${ error}`);
            return false;
        }

    }

}