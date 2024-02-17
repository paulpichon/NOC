// Conexion a la BD
import { envs } from "./config/plugins/envs.plugin";
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

    // star()
    Server.start();    
}

