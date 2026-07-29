// function greet(name: string): string {
//   return `Hello ${name}`;
// }
// console.log(greet("Kirtan"));

import dotenv from "dotenv";
import { connectDB } from "./DB/index.js";
import app from "./app.js";

// dotenv configuration for path declaration for env file
dotenv.config({ path: "./.env" });

// Get PORT from env. (Default value : 3000)
const PORT = process.env.PORT || 3000;

connectDB()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server is listening at port ${PORT}`);
      });
   })
   .catch((err) => {
      console.log("Server error occurred: ", err);
      throw err;
   });