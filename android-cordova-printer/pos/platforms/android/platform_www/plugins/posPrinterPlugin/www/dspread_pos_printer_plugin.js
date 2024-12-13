cordova.define("posPrinterPlugin.dspread_pos_printer_plugin", function(require, exports, module) {
var exec = require('cordova/exec');
var posPrinterPlug = {

    printerPluginListener:function(success,fail){
        exec(success,fail,"dspread_pos_printer_plugin","printerPluginListener",[]);
    },

    initPrinter:function(success,fail){
        exec(success,fail,"dspread_pos_printer_plugin","initPrinter",[]);
    },

    setAlign:function(success,fail,align){
        exec(success,fail,"dspread_pos_printer_plugin","setAlign",[align]);
    },

    //recommended 14 ~ 18
    setFontSize:function(success,fail,fontSize){
        exec(success,fail,"dspread_pos_printer_plugin","setFontSize",[fontSize]);
    },

    setFontStyle:function(success,fail,bold){
        exec(success,fail,"dspread_pos_printer_plugin","setFontStyle",[bold]);
    },

    //please always call this function if want set fontsize.etc
    setPrintStyle:function(success,fail){
        exec(success,fail,"dspread_pos_printer_plugin","setPrintStyle",[]);
    },

    printText:function(success,fail,text){
        exec(success,fail,"dspread_pos_printer_plugin","printText",[text]);
    },

    printBarCode:function(success,fail,symbology,width,height,content,position){
        exec(success,fail,"dspread_pos_printer_plugin","printBarCode",[symbology,width,height,content,position]);
    },

    printQRCode:function(success,fail,errorLevel,width,content,position){
        exec(success,fail,"dspread_pos_printer_plugin","printQRCode",[errorLevel,width,content,position]);
    },

    printBitmap:function(success,fail,bitmap){
        exec(success,fail,"dspread_pos_printer_plugin","printBitmap",[bitmap]);
    },

    addText:function(success,fail,text){
        exec(success,fail,"dspread_pos_printer_plugin","addText",[text]);
    },

    addTexts:function(success,fail,textLeft,textRight,rowLeft,rowRight,positionLeft,positionRight){
        exec(success,fail,"dspread_pos_printer_plugin","addTexts",[textLeft,textRight,rowLeft,rowRight,positionLeft,positionRight]);
    },

    addBarCode:function(success,fail,symbology,width,height,content,position){
        exec(success,fail,"dspread_pos_printer_plugin","addBarCode",[symbology,width,height,content,position]);
    },

    addQRCode:function(success,fail,width,errorLevel,content,position){
        exec(success,fail,"dspread_pos_printer_plugin","addQRCode",[width,errorLevel,content,position]);
    },

    addBitmap:function(success,fail,bitmap){
        exec(success,fail,"dspread_pos_printer_plugin","addBitmap",[bitmap]);
    },


    addPrintLintStyle:function(success,fail,bold,align,size){
        exec(success,fail,"dspread_pos_printer_plugin","addPrintLintStyle",[bold,align,size]);
    },

    print:function(success,fail,bold,align,size){
      exec(success,fail,"dspread_pos_printer_plugin","print",[]);
    },

    // from 1 to 5, This function needs to be implemented later
    setPrinterDensity:function(success,fail,printerDensityLevel){
        exec(success,fail,"dspread_pos_printer_plugin","setPrinterDensity",[printerDensityLevel]);
    },

    // from 1 to 5, This function needs to be implemented later
    setPrinterSpeed:function(success,fail,printerSpeedLevel){
        exec(success,fail,"dspread_pos_printer_plugin","setPrinterSpeed",[printerSpeedLevel]);
    },

    getPrinterStatus:function(success,fail){
        exec(success,fail,"dspread_pos_printer_plugin","getPrinterStatus",[]);
    },

    getPrinterDensity:function(success,fail){
        exec(success,fail,"dspread_pos_printer_plugin","getPrinterDensity",[]);
    },

    getPrinterSpeed:function(success,fail){
        exec(success,fail,"dspread_pos_printer_plugin","getPrinterSpeed",[]);
    },

    getPrinterTemperature:function(success,fail){
        exec(success,fail,"dspread_pos_printer_plugin","getPrinterTemperature",[]);
    },

    getPrinterVoltage:function(success,fail){
        exec(success,fail,"dspread_pos_printer_plugin","getPrinterVoltage",[]);
    },
};

module.exports = posPrinterPlug;


});
