import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';

describe('FileSystemDatasource', () => {
    // path de la carpeta logs
    const logPath = path.join(__dirname, '../../../logs')
        
    beforeEach( () => {
        // borrar la carpeta logs
        fs.rmSync( logPath, { recursive: true, force: true})

    });

    test('should create log files if they do not exists', () => {
        // se crean los archivos
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        expect( files ).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
        


    });

})