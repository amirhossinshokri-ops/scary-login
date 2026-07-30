const eye=document.querySelector(".loginImg")
const username=document.querySelector(".username")
const pass=document.querySelector(".pass")
const eyeSvg = document.querySelectorAll(".eye");

let isclosingEye =false;
let isFocused =false;
let hide =false;



// const closeframes=[
// "./frames/eyeframe0.svg",
// "./frames/eyeframe1.svg",
// "./frames/eyeframe2.svg",
// "./frames/eyeframe3.svg",
// "./frames/eyeframe4.svg"
// ]

// let openframes= closeframes.slice(0,-1).reverse()


// frames=[...closeframes,...openframes]
let sequence=[0,1,2,3,4,3,2,1,0]
let closeframes=sequence.slice(0,5)

let value,width;

function foucs(e){
  isFocused=true
  eye.style.setProperty("--x", "0px");
eye.style.setProperty("--y", "0px");

if(username.value.length==0){
eye.classList.add("active")
eye.style.setProperty("--left",-49+"px")}else{keyD()}

}


function keyD(){
  isFocused=true
  eye.style.setProperty("--x", "0px");
eye.style.setProperty("--y", "0px");

eye.classList.add("active")

  value=username.value
  
  width=49-(value.length+15)
  
  
eye.style.setProperty("--left",-width+"px")

}
function blure(){

eye.classList.remove("active")
isFocused=false
isclosingEye=false
setTimeout(blink,1000)
}


function showEyeFrame(index){
  eyeSvg.forEach(img => {
    img.classList.toggle("show", Number(img.dataset.frame) === index);
  });
}




function blink(){
  if(isclosingEye){return;}else{

  
  let i=0
  let x=setInterval(()=>{
    
 const frameIndex = sequence[i];
    eye.style.setProperty("--opacity", frameIndex === 0 ? 1 : 0);
    showEyeFrame(frameIndex);

  i++


if(i>sequence.length-1){
  clearInterval(x)
}
  },100)

  }

}


setInterval(blink,6000)


function movePupil(clientX, clientY) {
      if (isFocused) return;

      const rect = eye.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = clientX - centerX;
      let dy = clientY - centerY;

      const angle = Math.atan2(dy, dx);
      const distance = Math.hypot(dx, dy);
      const maxRadius = 20;

      const clampedDist = Math.min(distance, maxRadius);
      const x = Math.cos(angle) * clampedDist;
      const y = Math.sin(angle) * clampedDist;

      eye.style.setProperty("--x", x + "px");
      eye.style.setProperty("--y", y + "px");
    }

    // ===== رویداد ماوس =====
    window.addEventListener("mousemove", (e) => {
      movePupil(e.clientX, e.clientY);
    });

    // ===== رویداد لمس (موبایل) =====
    window.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      if (touch) {
        movePupil(touch.clientX, touch.clientY);
      }
    }, { passive: true });

        window.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      if (touch) {
        movePupil(touch.clientX, touch.clientY);
      }
    }, { passive: true });



  function foucousOnPass(){
    isclosingEye=true
 let i=0
  let x=setInterval(()=>{
    
 const frameIndex = closeframes[i];
    eye.style.setProperty("--opacity", frameIndex === 0 ? 1 : 0);
    showEyeFrame(frameIndex);

  i++




if(i>closeframes.length-1){
  clearInterval(x)
}
  },70)


    
  }


  function unhide(e){

if(hide){

  e.target.src="./svgs/nopeicon.svg"
  
  
  hide=false
}else{
  e.target.src="./svgs/icon.svg"
hide=true

}


  }