// importar paqueteria Cron
import { CronJob } from "cron";

// type
type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

    // metodos
    static createJob( cronTime: CronTime, onTick: OnTick): CronJob {

        // cronJob
        const job = new CronJob( cronTime, onTick );
        // job.start() is optional here because of the fourth parameter set to true.
        job.start();

        return job;

    }

}