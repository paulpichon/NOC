import { Server } from "./presentation/server";

// funcion anonima autoinvocada
(async() => {

    // llamamos la funcion main
    main();

})();

// 
function main() {
    Server.start();
}

