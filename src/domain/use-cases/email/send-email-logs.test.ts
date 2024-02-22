import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('SendEmailLogs', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue( true )
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );
        // limpiar todos los mocks
    beforeEach( () => {
        jest.clearAllMocks()
    });


    test('should call sendEmail and saveLog', async () => {

        const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mockLogRepository
        );

        const result = await sendEmailLogs.execute('paul@aquiestoy.mx');

        expect( result ).toBe( true );
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes( 1 );
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log Email sent",
            origin: "send-email-logs.ts",
        });

    });

    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue( false );

        const result = await sendEmailLogs.execute('paul@aquiestoy.mx');

        expect( result ).toBe( false );
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes( 1 );
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Email Logs not sent",
            origin: "send-email-logs.ts",
        });

    });


});