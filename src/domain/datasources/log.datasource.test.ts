import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasources";

describe('log.datasource.test.ts LogDatasource', () => {

    // log temporal
    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    });

    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return[newLog];
        }

    }

    test('Sould test the abstract class', async () => {
        const mockLogDatasource = new MockLogDatasource();
        expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
        expect( typeof mockLogDatasource.saveLog ).toBe( 'function' );
        expect( typeof mockLogDatasource.getLogs ).toBe( 'function' );

        await mockLogDatasource.saveLog( newLog );
        const logs = await mockLogDatasource.getLogs( LogSeverityLevel.high );
        expect( logs ).toHaveLength( 1 );
        expect( logs[ 0 ] ).toBeInstanceOf( LogEntity );
    });

});