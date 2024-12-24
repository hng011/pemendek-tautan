import app from './app'
import sequelize from './config/db';
import dotenv from 'dotenv';


dotenv.config();


let PORT:any = process.env.PORT;


(async () => {
    try {
        await sequelize.sync();
        // await sequelize.sync({force: true});
        console.log("Database Connected");
        
        app.listen(PORT, () => {
            console.log(`Server is running on: https://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server\n" + err);
    }
})();