var posX;
var posY;

let wind=document.getElementById('drop')
wind.addEventListener('click',(event)=>{

        var pX=event.clientX;
        var pY=event.clientY;
        posX=(pX-800)/4.7;
        posY=pY/3.3;
        console.log(posX)
        console.log(posY)

        var drag=document.getElementsByClassName('draggable');
        drag.style.position = 'absolute';
        drag.style.top = '100px';
        drag.style.left = '50px';
        
});

const wrapper = document.getElementById("signature-pad");
const clearButton = wrapper.querySelector("[data-action=clear]");
const undoButton = wrapper.querySelector("[data-action=undo]");
const savePNGButton = wrapper.querySelector("[data-action=save-png]");
const canvas = wrapper.querySelector("canvas");
const signaturePad = new SignaturePad(canvas, {
});

function resizeCanvas() {

  const ratio =  Math.max(window.devicePixelRatio || 1, 1);

  // This part causes the canvas to be cleared
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);


  signaturePad.fromData(signaturePad.toData());
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  const blob = dataURLToBlob(dataURL);
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", () => {
  signaturePad.clear();
});

undoButton.addEventListener("click", () => {
  const data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});



savePNGButton.addEventListener("click", () => {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    const dataURL = signaturePad.toDataURL();
    converterImagem(dataURL);
   // download(dataURL, "signature.png");
    
  }
});
function converterImagem(dataURL) {
            
       //**** INICIO GERAR PDF *****/
        // Instanciar o jsPDF
        var doc = new jsPDF();

        // Texto que deve estar no PDF
        doc.text('Cadawwdawd wa dawdawd adawdoi naiowd ioad ia n ion doawnid!', 15, 15);
        doc.text('Cadawwdawd wa123na32323 io2j2 n l2n 2n jnn l2n nl kl anwdklanid!', 15, 30);
        doc.text('____________________________________', 15, 80);
         console.log(posX);
      console.log(posY);
        doc.addImage(dataURL,posX,posY/2, 50, 50);

        // Gerar PDF
        doc.save('celke.pdf');

        //**** FIM GERAR PDF *****/
}

