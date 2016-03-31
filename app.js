var moment = require('moment');


var video = document.querySelector("#videoElement");

// check for getUserMedia support
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {      
    // get webcam feed if available
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}
 
function handleVideo(stream) {
    // if found attach feed to video element
    video.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
    // no webcam found - do something
}
var v,canvas,context,w,h;
var imgtag = document.getElementById('imgtag'); // get reference to img tag
var sel = document.getElementById('fileselect'); // get reference to file select input element

document.addEventListener('DOMContentLoaded', function(){
    // when DOM loaded, get canvas 2D context and store width and height of element
    v = document.getElementById('videoElement');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;

},false);

function draw(v,c,w,h) {

    if(v.paused || v.ended) return false; // if no video, exit here

    context.drawImage(v,0,0,w,h); // draw video feed to canvas
    var ctx = canvas.getContext('2d');
   var uri = canvas.toDataURL("image/png"); // convert canvas to data URI
   
   // console.log(uri); // uncomment line to log URI for testing
   
   imgtag.src = uri; // add URI to IMG tag src
}

document.getElementById('save').addEventListener('click',function(e){
    document.getElementById('comedia').classList.toggle('hide');

});document.getElementById('content').addEventListener('click',function(e){
    window.requestAnimationFrame(drawhappy);

});document.getElementById('mechant').addEventListener('click',function(e){
    window.requestAnimationFrame(drawtriste);


});



   
function eur(){
    var canvas = document.getElementById('eur');
    var ctx = canvas.getContext('2d');
    var eur = moment().format("h:mm:ss a");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "13pt Calibri";
    ctx.fillText(eur, 230, 350);

}
setInterval(eur, 1001);
var canvas = document.getElementById('comedia');
  var ctx = canvas.getContext('2d');
var action;


    //tout effacer
        function clear() {
          ctx.clearRect(0,0,canvas.width,canvas.height);
        }
        drawmask();
    //contour du visage
function drawmask(){
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.bezierCurveTo(100, 170, 100, 170, 150, 100);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.lineTo(150, 30);
    ctx.bezierCurveTo(100, 50, 100, 50, 50, 30);
    ctx.lineTo(50, 102);
    ctx.stroke();
    
}


    //le visage
    function drawhappy(){
        clear();
        drawmask();
    ctx.moveTo(70, 80);
    ctx.lineWidth = 10;
    ctx.bezierCurveTo(80, 90, 80, 90, 90, 80);
    ctx.lineWidth = 4;
    ctx.moveTo(110, 80);
    ctx.bezierCurveTo(120, 90, 120, 90, 130, 80);
    ctx.moveTo(120, 110);
    ctx.bezierCurveTo(100, 115, 100, 115, 80, 110);
    ctx.bezierCurveTo(100, 130, 100, 130, 120, 110);
    ctx.stroke();
    window.requestAnimationFrame(drawhappy);
}

    //visage triste
    function drawtriste(){
        clear();
        drawmask();
    ctx.moveTo(70, 80);
    ctx.lineTo(90, 80); 
    ctx.lineWidth = 4;
    ctx.moveTo(110, 80);
    ctx.lineTo(130, 80);
    ctx.moveTo(120, 120);
    ctx.bezierCurveTo(100, 110, 100, 110, 90, 120);
    ctx.bezierCurveTo(100, 120, 100, 115, 120, 120);
    ctx.strokeStyle = "red"
    ctx.stroke();
    window.requestAnimationFrame(drawtriste)
}


// for iOS

// create file reader
var fr;

sel.addEventListener('change',function(e){
    var f = sel.files[0]; // get selected file (camera capture)
   
    fr = new FileReader();
    fr.onload = receivedData; // add onload event

    fr.readAsDataURL(f); // get captured image as data URI
})

function receivedData() {          
    // readAsDataURL is finished - add URI to IMG tag src
    imgtag.src = fr.result;
}