import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

// interfaz
interface CheckServiceMultipleUseCase {
    // definimos nuestro metodo execute()
    execute( url: string): Promise<boolean>;
}

// creacion de 2 types
type SuccessCallback = (() => void ) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    // inyenccion de dependencias
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    private callLogs( log: LogEntity ) {
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog( log );
        });
    }

    // metodos
    async execute( url: string ): Promise<boolean>  {

        try {
            const req = await fetch( url );
            // verificamos
            if ( !req.ok ) {
                throw new Error(`Error on check service ${url}`);
            }

            // Log
            const log = new LogEntity({
                message: `Service ${ url } working`, 
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            // grabar un log
            this.callLogs( log);
            //    si existe this.successCallback manda a llamar ---> this.successCallback
            this.successCallback && this.successCallback();
            // esto es similar a 
            /*
                if( this.successCallback ) {
                    this.successCallback()
                }
            */ 
            return true;

        } catch (error) {
            const errorMessage = `${ url } is not OK!. ${ error }`;
            // Log de error
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            // grbar log
            this.callLogs( log );
            
            this.errorCallback && this.errorCallback( errorMessage );
             // esto es similar a 
            /*
                if( this.errorCallback ) {
                    this.errorCallback( errorMessage )
                }
            */ 
            return false;
        }

    }

}