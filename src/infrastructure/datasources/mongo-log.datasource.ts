// LogDatasource
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
// LogModel
import { LogModel } from "../../data/mongo";



export class MongoLogDatasource implements LogDatasource {
    // creacion de logs
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        // mongo log created
        console.log('Mongo log created', newLog.id);
        
    }
    // obetener los logs
    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        });

        return logs.map( LogEntity.fromObject );
    }
}