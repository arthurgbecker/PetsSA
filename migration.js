import connection from "./config/db.js";
import Petshop from "./models/petshop.js";
import Pet from "./models/Pet.js";
import Service from "./models/Service.js";
import User from "./models/User.js";

const migrate = async () => {
    try {
        
        const result = await connection.sync();
        console.log(result);
    
    } catch (error) {

        console.log(error);

    }
};

migrate();