// Conexion a la BD
import { envs } from "./config/plugins/envs.plugin";
// Primsa
import { PrismaClient } from "@prisma/client";
// MongoDB
import { MongoDatabase } from "./data/mongo";
// Star()
import { Server } from "./presentation/server";

// funcion anonima autoinvocada
(async() => {
    // llamamos la funcion main
    main();
})();

// 
async function main() {
    // mongodb
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // POSTGRESQL
    // const prisma = new PrismaClient();
    // crear un registro
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test Message',
    //         origin:'App.ts',
    //     }
    // });

    // Leer los registros
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH',
    //     }
    // });
    
    

    // star()
    Server.start();    
}

