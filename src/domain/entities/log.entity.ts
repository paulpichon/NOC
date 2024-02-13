
// enumeracion
// https://www.google.com/search?q=que+es+enum+typescript&oq=que+es+enum+typescript&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRifBdIBCTExNjM5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
// esto tambien podria ser como un type(tipo)
export enum LogSeverityLevel {
    low= 'low',
    medium= 'medium',
    high= 'high'
}

// options
export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}


// Aqui tendremos lo que queremos registrar en nuestra aplicacion
export class LogEntity {

    public level: LogSeverityLevel; //Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    // constructor
    constructor( options: LogEntityOptions) {
        // desestructurar options
        const { message, level, origin, createdAt = new Date() } = options;
        // inicializar
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    // metodo para parsear el JSON
    static fromJson = ( json: string ): LogEntity => {
        // desestructuramos de JSON.parse( json )
        const { message, level, createdAt, origin } = JSON.parse( json );
        // creamos el log
        const log = new LogEntity( {
            message, 
            level,
            createdAt,
            origin
        } );
        // retornamos el log
        return log;

    }

}