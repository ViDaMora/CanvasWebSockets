module.exports = (io)=>{

    let line_history = [];


    io.on('connection',(socket)=>{
        
            for (let i in line_history) {
              socket.emit('dibujar_linea', {line: line_history[i]});
            }



    console.log("Nuevo usuario conectado");

    socket.on('clear',(data)=>{
      line_history= [];
      io.emit('clear',data);

    })
    
    socket.on('dibujar_linea',(data)=>{

        line_history.push(data.line);
        io.emit('dibujar_linea', data);
    }); 
    })

}