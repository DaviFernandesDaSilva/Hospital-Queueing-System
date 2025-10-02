// src/socket.js
import { io } from "socket.io-client";
import { config } from "./Config/config.js"; // seu backend URL

// Conexão principal (namespace '/')
export const homeSocket = io(config.URL, {
  withCredentials: false
});

socket.on("next", () => {
  this.refreshTickets();
});
socket.on("newPatient", () => {
  this.refreshTickets();
});

// Conexão do namespace '/queue'
export const queueSocket = io(`${config.URL}/queue`, {
  withCredentials: false
});
