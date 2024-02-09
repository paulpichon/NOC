// Importamos de log.entity.ts
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//Una clase abstracta nos ayuda a evitar a crear una instancia de la clase LogDatasource, en eset caso.
// Esto nos ayuda a que nadie pueda crear instancias de nuestra clase LogDatasource directamente.
export abstract class LogDatasource {
    // metodos
    abstract saveLog( log: LogEntity): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
