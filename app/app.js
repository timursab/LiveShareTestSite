
var holding = false;
var canCallBarFull = true;
class Click {
     /**
      * 
      * @param {EventTarget} target 
      * @param {Function} callback 
      */
     constructor(target, callback){
         this.target = target;
         this.callback = callback;
         this.isHeld = false;
         this.activeHoldTimeoutId = null;

         ["mousedown","touchstart"].forEach(type => {
             this.target.addEventListener(type, this._onHoldStart.bind(this));
         });

         ["mouseup","mouseleave","mouseout","touchend","touchcancel"].forEach(type => {
            this.target.addEventListener(type, this._onHoldEnd.bind(this));
         });
     }

     _onHoldStart() {
        holding = true;
        this.isHeld = true;

        this.activeHoldTimeoutId = setTimeout(() => {
            if(this.isHeld){
                this.callback();
            }
        },1000);
     }

     _onHoldEnd() {
         holding = false;
         this.isHeld = false;
         clearTimeout(this.activeHoldTimeoutId);
     }

     /**
      * 
      * @param {EventTarget} target 
      * @param {Function} callback 
      */

     static apply(target,callback){
         new Click(target,callback);
     }

}



 const myButton = document.getElementById("myButton");

 var r = document.querySelector(':root');
 var barProgress = 0;
 Click.apply(myButton,()=>{
    console.log("Pressed");
});


//BarProgress Animations
setInterval(() => {
    if(holding){
        if(barProgress < 100){
            barProgress += 1;
        }
    }
    else{
        if(barProgress > 0){
            barProgress -= 1;
        }
    }
    r.style.setProperty("--loadingprogress",barProgress.toString() + "%");


}, 10);

//BarProgressCheck
setInterval(() => {
    if(barProgress <= 0 && ! canCallBarFull){
        canCallBarFull = true;
    }

    if(barProgress >= 100 && canCallBarFull){
        console.log("BarFull");
        canCallBarFull = false;
    }
}, 50);