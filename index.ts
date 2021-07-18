import app from './app';
import * as dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;

const server = app.listen(
  PORT,
  () => {
    console.log(
      `>> App is running on port  ${PORT}`
    );
  },
);

export default server;