import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controller/UserController";

createConnection()
  .then(async (connection) => {
    console.log("Connected. ");

    const ap = createExpressServer({
      controllers: [UserController],
    });

    ap.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
