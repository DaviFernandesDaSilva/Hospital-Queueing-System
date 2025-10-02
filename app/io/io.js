let io = null;

const setIo = (server) => {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3001", // aqui você coloca a URL do seu frontend
      methods: ["GET", "POST"]
    }
  });
};

const getIo = () => io;

module.exports = { setIo, getIo };
