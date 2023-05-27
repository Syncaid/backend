


const handleSocketConnection = (io) => {

    //lista mta clients connecté al socket kol
   const connectedClients = {};
   

    io.on('connection', (socket) => {
      const buildId = socket.handshake.query.buildId;
      console.log(`User with buildId ${buildId} connected`);
  
      connectedClients[socket.id] = { buildId };
      
      

      const interval = setInterval(() => {

        const heartRate = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        console.log(`Sending heart rate ${heartRate} BPM`)
        socket.emit('heartrate', "10");


        const oxygenLevel = Math.floor(Math.random() * (100 - 95 + 1) + 95);
        console.log(`Sending blood oxygen level ${oxygenLevel}%`)
        socket.emit('bloodoxygen', "10");

      }, 5000);
  


      socket.on('disconnect', () => {
        delete connectedClients[socket.id];
        clearInterval(interval);
        console.log(`User with buildId ${buildId} disconnected`);
      });
    });
  };
  
  export default handleSocketConnection;
  