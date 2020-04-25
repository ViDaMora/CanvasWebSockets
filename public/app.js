function init(){
    let mouse ={
        click: false,
        move: false,
        pos: {x :0, y:0},
        pos_prev : false,
        color : "black"
    }

    const canvas = document.getElementById('drawing');
    const context  = canvas.getContext('2d');
    let blackbtn = document.getElementById('negro');
    let redbtn = document.getElementById('rojo');
    let bluebtn = document.getElementById('azul');
    let greenbtn = document.getElementById('verde');
    let clearbtn = document.getElementById('clear');
    let savebtn = document.getElementById('save');

    let limpiar = false;

    const alto = window.innerHeight;
    const ancho = alto + alto*0.5;
    var background = new Image();
    canvas.height =alto;
    canvas.width=  ancho;
    const socket = io(); //conexion al server

    savebtn.addEventListener('click',(e)=>{
       
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");     
        window.location.href=image;
});
  
    clearbtn.addEventListener('click',(e)=>{
            limpiar = true;
    });

    blackbtn.addEventListener('click',(e)=>{
            mouse.color= blackbtn.value;
    });
    redbtn.addEventListener('click',(e)=>{
        mouse.color= redbtn.value;
    });
    bluebtn.addEventListener('click',(e)=>{

        mouse.color= bluebtn.value;
    });
    greenbtn.addEventListener('click',(e)=>{
        mouse.color= greenbtn.value;
    });

    canvas.addEventListener('mousedown',(e)=>{
        mouse.click=true;
    });
    canvas.addEventListener('mouseup',(e)=>{
        mouse.click=false;

    });
    canvas.addEventListener('mousemove',(e)=>{
       mouse.pos.x= e.clientX/  ancho;
       mouse.pos.y=e.clientY/alto ;
       mouse.move = true;

    });

    
    socket.on('dibujar_linea', data => {
        let line = data.line;
        context.beginPath()
        context.lineWidth = 2;
        context.moveTo(line[0].x *ancho, line[0].y * alto);
        context.lineTo(line[1].x *ancho, line[1].y * alto);
        console.log(line[2]);
        context.strokeStyle = line[2];
        context.stroke();

      });

      socket.on('clear', data=>{
        canvas.width=canvas.width;
      })

    function mainloop(){


        if(mouse.click && mouse.move && mouse.pos_prev){
            socket.emit('dibujar_linea',{line:[mouse.pos,mouse.pos_prev, mouse.color]}) //enviamos la informacion posx posy y color
            mouse.move =false;
        }  

        if(limpiar){
            socket.emit('clear', limpiar);
            limpiar=false;
        }



        mouse.pos_prev={x: mouse.pos.x, y: mouse.pos.y};
        setTimeout(mainloop,25);  
    }
    mainloop();

   

    
}

document.addEventListener('DOMContentLoaded', init)