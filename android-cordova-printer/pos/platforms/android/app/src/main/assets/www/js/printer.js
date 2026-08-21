var tbody = document.querySelector('tbody');
var tabled = document.getElementById("tablediv");
var txtresult = document.getElementById("posResult");
txtresult.style.display="none";

window.onload = function(){
    document.addEventListener("deviceready", onDeviceReady, false);
}

function initPrinter(){
    tabled.style.display = 'block';
    txtresult.style.display = 'none';
    console.log("initPrinter");
    cordova.plugins.dspread_pos_printer_plugin.initPrinter(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    });
}

function closePrinter(){
  tabled.style.display = 'block';
  txtresult.style.display = 'none';
  console.log("close");
  cordova.plugins.dspread_pos_printer_plugin.close(function(message){
    console.log("success: " +message);
    posresult(message);
  },function(message){
     console.log("fail: " +message);
     posresult(message);
  });
}

function printText(){
    tabled.style.display = 'block';
    txtresult.style.display = 'none';
    console.log("printText");
    cordova.plugins.dspread_pos_printer_plugin.setAlign(function(message){
          console.log("success: " +message);
          posresult(message);
        },function(message){
           console.log("fail: " +message);
           posresult(message);
        },PrintLine.CENTER);

    cordova.plugins.dspread_pos_printer_plugin.setFontSize(function(message){
          console.log("success: " +message);
          posresult(message);
        },function(message){
           console.log("fail: " +message);
           posresult(message);
        },15);

    cordova.plugins.dspread_pos_printer_plugin.setFontStyle(function(message){
          console.log("success: " +message);
          posresult(message);
        },function(message){
           console.log("fail: " +message);
           posresult(message);
        },FontStyle.NORMAL);

    cordova.plugins.dspread_pos_printer_plugin.setPrintStyle(function(message){
       console.log("success: " +message);
       posresult(message);
     },function(message){
        console.log("fail: " +message);
        posresult(message);
     });

    cordova.plugins.dspread_pos_printer_plugin.printText(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    },"234234234234234234234234");
}

function printBarCode(){
    tabled.style.display = 'block';
    txtresult.style.display = 'none';
    console.log("printBarCode");
    cordova.plugins.dspread_pos_printer_plugin.printBarCode(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    },Barcode1D.CODE_128,400,150,"barcode",PrintLine.CENTER);
}

function printQRCode(){
    tabled.style.display = 'block';
    txtresult.style.display = 'none';
    console.log("printQRCode");
    cordova.plugins.dspread_pos_printer_plugin.printQRCode(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    },ErrorLevel.Q,"300", "printQRCode", PrintLine.CENTER);
}

function printBitmap(){
    tabled.style.display = 'block';
    txtresult.style.display = 'none';
    console.log("printQRCode");
    const imagePath = './img/demo.jpg'; // Path relative to where index.html is loaded
    fetch(imagePath).then( response =>{
        response.blob().then( blob => {
            const reader = new FileReader();
            reader.onloadend = function() {
                const bitmapArray = new Uint8Array(reader.result);
                let base64bitmapString = btoa(String.fromCharCode(...bitmapArray));                cordova.plugins.dspread_pos_printer_plugin.printBitmap(function(message){
                  console.log("success: " +message);
                  posresult(message);
                },function(message){
                   console.log("fail: " +message);
                   posresult(message);
                },base64bitmapString);
            };

            reader.readAsArrayBuffer(blob);
        })
    })


}

function print(){
    tabled.style.display = 'block';
    txtresult.style.display = 'none';
    console.log("print");
    cordova.plugins.dspread_pos_printer_plugin.addPrintLintStyle(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    },FontStyle.BOLD, PrintLine.CENTER, 13);
    cordova.plugins.dspread_pos_printer_plugin.addText(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    },"single text");
//    var texts = ["No. de tarjeta","Vigencia" ];
//    var textsJsonArray = JSON.stringify(texts);
//    var colsWidthArrs = [1, 1];
//    var colsWidthArrsJsonArray = JSON.stringify(colsWidthArrs);
//    var styles = [PrintLine.LEFT, PrintLine.RIGHT];
//    var stylesJsonArray = JSON.stringify(styles);
    cordova.plugins.dspread_pos_printer_plugin.addTexts(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    },"No. de tarjeta","Vigencia", 1, 1, PrintLine.LEFT, PrintLine.RIGHT);
//     cordova.plugins.dspread_pos_printer_plugin.addQRCode(function(message){
//          console.log("success: " +message);
//          posresult(message);
//        },function(message){
//           console.log("fail: " +message);
//           posresult(message);
//        },ErrorLevel.M,"200", "printQRCode", PrintLine.CENTER);
//    cordova.plugins.dspread_pos_printer_plugin.addBarCode(function(message){
//      console.log("success: " +message);
//      posresult(message);
//    },function(message){
//       console.log("fail: " +message);
//       posresult(message);
//    },Barcode1D.CODE_128,300,120,"barcode",PrintLine.CENTER);
    const imagePath = './img/demo.jpg'; // Path relative to where index.html is loaded
    fetch(imagePath).then( response =>{
        response.blob().then( blob => {
            const reader = new FileReader();
            reader.onloadend = function() {
                const bitmapArray = new Uint8Array(reader.result);
                let base64bitmapString = btoa(String.fromCharCode(...bitmapArray));                cordova.plugins.dspread_pos_printer_plugin.printBitmap(function(message){
                  console.log("success: " +message);
                  posresult(message);
                },function(message){
                   console.log("fail: " +message);
                   posresult(message);
                },base64bitmapString);
            };

            reader.readAsArrayBuffer(blob);
        })
    })
    cordova.plugins.dspread_pos_printer_plugin.print(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    });
}

function setPrinter(){
    tabled.style.display = 'block';
    txtresult.style.display = 'none';
    console.log("setPrinter");
//    cordova.plugins.dspread_pos_printer_plugin.setPrinterDensity(function(message){
//      console.log("success: " +message);
//      posresult(message);
//    },function(message){
//       console.log("fail: " +message);
//       posresult(message);
//    },2);
//    cordova.plugins.dspread_pos_printer_plugin.setPrinterSpeed(function(message){
//      console.log("success: " +message);
//      posresult(message);
//    },function(message){
//       console.log("fail: " +message);
//       posresult(message);
//    },4);
    cordova.plugins.dspread_pos_printer_plugin.setPrinterSpeed(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    },4);
}

function getStatus(){
    tabled.style.display = 'block';
    txtresult.style.display = 'none';
    console.log("getStatus");
//    cordova.plugins.dspread_pos_printer_plugin.getPrinterStatus(function(message){
//      console.log("success: " +message);
//      posresult(message);
//    },function(message){
//       console.log("fail: " +message);
//       posresult(message);
//    });
//    cordova.plugins.dspread_pos_printer_plugin.getPrinterDensity(function(message){
//      console.log("success: " +message);
//      posresult(message);
//    },function(message){
//       console.log("fail: " +message);
//       posresult(message);
//    });
    cordova.plugins.dspread_pos_printer_plugin.getPrinterSpeed(function(message){
      console.log("success: " +message);
      posresult(message);
    },function(message){
       console.log("fail: " +message);
       posresult(message);
    });
//    cordova.plugins.dspread_pos_printer_plugin.getPrinterTemperature(function(message){
//      console.log("success: " +message);
//      posresult(message);
//    },function(message){
//       console.log("fail: " +message);
//       posresult(message);
//    });
//    cordova.plugins.dspread_pos_printer_plugin.getPrinterVoltage(function(message){
//      console.log("success: " +message);
//      posresult(message);
//    },function(message){
//       console.log("fail: " +message);
//       posresult(message);
//    });
}

function onDeviceReady() {
    cordova.plugins.dspread_pos_printer_plugin.printerPluginListener(function(message){
        var event = message["event"];
        var messageStr = message["message"];
        console.log("event: " + event + "\n" + "message: " + messageStr);
        if(event.startsWith("printResult")){
            posresult(messageStr);
        }
        else{
           posresult("event: " + event + "\n" + "message: " + messageStr);
        }
     },function(message){
        console.log("fail: " +message);
        posresult(message);
     });
}


function posresult(text){//display the pos status
    tabled.style.display='none';
    txtresult.style.display='block';
    txtresult.value = text;
}