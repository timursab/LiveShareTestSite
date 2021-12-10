
 var holding = false;

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
 var barProgress = 5;
 Click.apply(myButton,()=>{
    r.style.setProperty("--loadingprogress",barProgress.toString() + "%");
    barProgress += 5;
});

loop();

 function loop(){

 }