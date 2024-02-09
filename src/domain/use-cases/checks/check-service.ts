import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

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
        private readonly logRepository: LogRepository,
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

            // Log
            const log = new LogEntity(`Service ${ url } working`, LogSeverityLevel.low);
            // grabar un log
            this.logRepository.saveLog( log);
            this.successCallback();            
            return true;

        } catch (error) {
            const errorMessage = `${ url } is not OK!. ${ error }`;
            // Log de error
            const log = new LogEntity( errorMessage, LogSeverityLevel.high);
            // grbar log
            this.logRepository.saveLog( log );

            this.errorCallback( errorMessage );
            return false;
        }

    }

}