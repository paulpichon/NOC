// fs
import fs from 'fs';
// importamos de /domain/datasources/log.datasources
import { LogDatasource } from "../../domain/datasources/log.datasources";
// importar interface de LogDatasource
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource{
    // 
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-low.log';
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


    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }



}