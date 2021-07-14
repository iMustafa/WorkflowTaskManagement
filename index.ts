import app from './app';
require('dotenv').config();

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