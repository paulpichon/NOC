// fs
import fs from 'fs';
// importamos de /domain/datasources/log.datasources
import { LogDatasource } from "../../domain/datasources/log.datasources";
// importar interface de LogDatasource
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource{
    // 
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    // constructor
    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {

        // verificamos si no existe el logPath
        if ( !fs.existsSync( this.logPath ) ) {
            // creamos el logPath sino existe
            fs.mkdirSync( this.logPath );
        }

        // 
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            // verificamos si existe, si existe entonces nos hacemos nada
            if ( fs.existsSync( path )) return;
            // pero si no existe entonces, creamos el archivo
            fs.writeFileSync( path, '');
        });


    }


    async saveLog( newLog: LogEntity): Promise<void> {
        // constante para crear log a JSON
        const logAsJson = `${ JSON.stringify( newLog ) }\n`;

        // grabar logs
        fs.appendFileSync( this.allLogsPath, logAsJson );
        // verificar si el level es identicamente igual a low level
        // si es igual entonces ponemos un return;
        if ( newLog.level === LogSeverityLevel.low) return;
        // medium
        // si level es igual a medium
        if ( newLog.level === LogSeverityLevel.medium) {
            // lo grabamos
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        } else {
            // en el caso que no sea ni low ni medium entonces lo grabamos en HIGH
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }
    }

    // nos creamos un metodo privado
    private getLogsFromFile = ( path: string ) : LogEntity[] => {
        const content = fs.readFileSync( path, 'utf8' );
        // separamos los LOGS por "\n" y con .map() hacemos el LOGENTITY.FROMJSON para parsear los LOGS
        const logs = content.split('\n').map( LogEntity.fromJson );
        // esto lo podemos hacer asi o com esta arriba
        // const logs = content.split('\n').map(
        //     log => LogEntity.fromJson( log )
        // );
        // regresamos logs
        return logs;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch ( severityLevel ) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
    
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                // en caso de que haya un severityLevel que no exista mandamos un mensaje de error
                throw new Error(`${ severityLevel } no implementado`);
        }
        
    }



}