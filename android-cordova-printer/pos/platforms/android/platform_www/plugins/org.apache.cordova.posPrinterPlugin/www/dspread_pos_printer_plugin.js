cordova.define("org.apache.cordova.posPrinterPlugin.dspread_pos_printer_plugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'dspread_pos_printer_plugin', 'coolMethod', [arg0]);
};

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

//    PrintLine.LEFT
//    PrintLine.CENTER
//    PrintLine.RIGHT

    setFontSize:function(success,fail,fontSize){
        exec(success,fail,"dspread_pos_printer_plugin","setFontSize",[fontSize]);
    },

    setFontStyle:function(success,fail,bold){
        exec(success,fail,"dspread_pos_printer_plugin","setFontStyle",[bold]);
    },
//
//PrintStyle.FontStyle.NORMAL
//PrintStyle.FontStyle.BOLD
//PrintStyle.FontStyle.ITALIC
//PrintStyle.FontStyle.BOLD_ITALIC

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

    addTexts:function(success,fail,texts,colsWidthArrs,styles){
        exec(success,fail,"dspread_pos_printer_plugin","addTexts",[texts,colsWidthArrs,styles]);
    },

    // from 1 to 5
    setPrinterDensity:function(success,fail,printerDensityLevel){
        exec(success,fail,"dspread_pos_printer_plugin","setPrinterDensity",[printerDensityLevel]);
    },

    // from 1 to 5
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
}

module.exports = posPrinterPlug;
});
