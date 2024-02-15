// emailService
import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
// LogRepository
import { LogRepository } from "../../repository/log.repository";

// interface
interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

// 
export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {}

    async execute( to: string | string[] ) {

        try {
            
            const send = await this.emailService.sendEmailWithFileSystemLogs( to );
            // verificar si se envio: send = true || false
            if ( !send ) {
                throw new Error('Email Logs not sent');
            }

            const log = new LogEntity({
                message: `Log Email sent`,
                level: LogSeverityLevel.low,
                origin:'send-email-logs.ts'
            });

            this.logRepository.saveLog(log);

            return true;

        } catch (error) {
            
            const log = new LogEntity({
                message: `${ error }`,
                level: LogSeverityLevel.high,
                origin:'send-email-logs.ts'
            });

            this.logRepository.saveLog(log);
            return false;   

        }

    }

}