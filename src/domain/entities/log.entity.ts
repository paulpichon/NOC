
// enumeracion
// https://www.google.com/search?q=que+es+enum+typescript&oq=que+es+enum+typescript&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRifBdIBCTExNjM5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
// esto tambien podria ser como un type(tipo)
export enum LogSeverityLevel {
    low= 'low',
    medium= 'medium',
    high= 'high'
}


// Aqui tendremos lo que queremos registrar en nuestra aplicacion
export class LogEntity {

    public level: LogSeverityLevel; //Enum
    public message: string;
    public createdAt: Date;

    // constructor
    constructor(message: string, level: LogSeverityLevel) {
        // inicializar
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

}