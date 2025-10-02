'use strict';
const db = require('../models/index.js');
const Patient = db.Patient;
const Queue = db.Queue;
const Ticket = db.Ticket;
const io = require('../io/io').getIo();
const queue = io.of('/queue').on('connection', socket=>{
  console.log("Connected from Queue page.");
});
exports.create = async function(req, res){
    console.log("Body recebido do frontend:", req.body); // 🔹 log do body

    let {firstName, lastName, caseDescription, gender, birthday} = req.body;

    let activeQueue = await Queue.findAll({
        where:{
            isActive: true
        },
        include: [{ model: Ticket }]
    });

    console.log("Filas ativas encontradas:", activeQueue.length);

    let result = { success: false, message: null };

    if(activeQueue.length > 0){
        try{
            activeQueue = activeQueue[0];
            let tickets = await activeQueue.getTickets();
            let ticketNumber = tickets.length === 0 ? 1 : tickets.length + 1;

            console.log("Criando paciente...");
            let patient = await Patient.create({
                firstName,
                lastName,
                caseDescription,
                gender,
                birthday
            });
            console.log("Paciente criado:", patient.id);

            console.log("Criando ticket...");
            let ticket = await Ticket.create({
                isActive: true,
                ticketNumber
            });

            await ticket.setPatient(patient);
            await ticket.setQueue(activeQueue);
            console.log(`Ticket ${ticket.id} associado ao paciente ${patient.id} e à fila ${activeQueue.id}`);

            result.success = true;
            result.message = "Patient successfully created.";

            queue.emit("newPatient");

        } catch(e){
            console.error("Erro ao criar paciente/ticket:", e);
            result.success = false;
            result.message = e.toString();
        }
    } else {
        console.warn("Nenhuma fila ativa encontrada.");
        result.success = false;
        result.message = "No active queue.";
    }

    console.log("Resultado final:", result);
    res.send(result);
}
