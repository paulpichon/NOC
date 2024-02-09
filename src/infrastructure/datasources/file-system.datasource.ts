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
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }



}