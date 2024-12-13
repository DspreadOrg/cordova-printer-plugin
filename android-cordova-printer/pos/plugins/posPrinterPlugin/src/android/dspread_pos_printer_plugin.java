package org.apache.cordova.posPrinterPlugin;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.os.RemoteException;
import android.util.Base64;
import android.util.Log;

import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;


import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import com.action.printerservice.PrintStyle;

import com.dspread.print.device.PrintListener;
import com.dspread.print.device.PrinterDevice;
import com.dspread.print.device.PrinterInitListener;
import com.dspread.print.device.PrinterManager;
import com.dspread.print.device.bean.PrintLineStyle;
import com.dspread.print.widget.PrintLine;

import com.dspread.print.widget.BitmapPrintLine;
import com.dspread.print.widget.PrintLine;
import com.dspread.print.widget.PrinterLayout;


/**
 * This class echoes a string called from JavaScript.
 */
public class dspread_pos_printer_plugin extends CordovaPlugin {

    private Map map = new HashMap();
    private PluginResult pluginResult = null;

    protected PrinterDevice mPrinter;
    private PrintLineStyle printLineStyle;

    private Context mContext;
    private MyPrinterListener myPrinterListener = new MyPrinterListener();


    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("printerPluginListener")) {
            map.put(action, callbackContext.getCallbackId());
        } else if (action.equals("initPrinter")) {
            TRACE.d("initPrinter");
            PrinterManager instance = PrinterManager.getInstance();
            mPrinter = instance.getPrinter();
            mPrinter.setPrintListener(myPrinterListener);
            printLineStyle = new PrintLineStyle();
            if ("D30".equals(Build.MODEL)) {
                mPrinter.initPrinter(mContext, new PrinterInitListener() {
                    @Override
                    public void connected() {
                        mPrinter.setPrinterTerminatedState(PrinterDevice.PrintTerminationState.PRINT_STOP);
                /*When no paper, the
                printer terminates printing and cancels the printing task.*/
//              PrinterDevice.PrintTerminationState.PRINT_STOP
               /* When no paper, the
                printer will prompt that no paper. After loading the paper, the printer
                will continue to restart printing.*/
//              PrinterDevice.PrintTerminationState. PRINT_NORMAL
                    }

                    @Override
                    public void disconnected() {
                    }
                });

            } else {
                mPrinter.initPrinter(mContext);
            }
        } else if (action.equals("setAlign")) {
            TRACE.d("setAlign");
            String align = args.getString(0);
            TRACE.d("align:"+align);
            switch (align) {
                case "LEFT" :
                    printLineStyle.setAlign(PrintLine.LEFT);
                    break;
                case "CENTER" :
                    printLineStyle.setAlign(PrintLine.CENTER);
                    break;
                case "RIGHT" :
                    printLineStyle.setAlign(PrintLine.RIGHT);
                    break;
                default:
                    break;
            }

        } else if (action.equals("setFontSize")) {
            TRACE.d("setFontSize");
            int fontsize = args.getInt(0);
            TRACE.d("size:"+fontsize);
            printLineStyle.setFontSize(fontsize);
        } else if (action.equals("setFontStyle")) {
            TRACE.d("setFontStyle");
            String bold = args.getString(0);
            TRACE.d("bold:"+bold);
            switch (bold) {
                case "NORMAL" :
                    printLineStyle.setFontStyle(PrintStyle.FontStyle.NORMAL);
                    break;
                case "BOLD" :
                    printLineStyle.setFontStyle(PrintStyle.FontStyle.BOLD);
                    break;
                case "ITALIC" :
                    printLineStyle.setFontStyle(PrintStyle.FontStyle.ITALIC);
                    break;
                case "BOLD_ITALIC" :
                    printLineStyle.setFontStyle(PrintStyle.FontStyle.BOLD_ITALIC);
                    break;
                default:
                    break;
            }
        } else if (action.equals("setPrintStyle")) {
            TRACE.d("setFontStyle");
            mPrinter.setPrintStyle(printLineStyle);
        } else if (action.equals("printText")) {
            TRACE.d("printText");
            String text = args.getString(0);
            TRACE.d("text:"+text);
            try {
                mPrinter.printText(text);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("printBarCode")) {
            TRACE.d("printBarCode");
            String symbology = args.getString(0);
            int width = args.getInt(1);
            int height = args.getInt(2);
            String content = args.getString(3);
            String position = args.getString(4);
            TRACE.d("symbology:"+symbology+" width:"+width+" height:"+height+" content:"+content+" position:"+position);
            int positionValue;
            switch (position) {
                case "LEFT" :
                    positionValue = PrintLine.LEFT;
                    break;
                case "CENTER" :
                    positionValue = PrintLine.CENTER;
                    break;
                case "RIGHT" :
                    positionValue = PrintLine.RIGHT;
                    break;
                default:
                    positionValue = PrintLine.LEFT;
                    break;
            }
            try {
                mPrinter.printBarCode(mContext, symbology, width, height, content, positionValue);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("printQRCode")) {
            TRACE.d("printQRCode");
            String errorLevel = args.getString(0);
            int width = args.getInt(1);
            String content = args.getString(2);
            String position = args.getString(3);
            TRACE.d("errorLevel:"+errorLevel+" width:"+width+" content:"+content+" position:"+position);
            int positionValue;
            switch (position) {
                case "LEFT" :
                    positionValue = PrintLine.LEFT;
                    break;
                case "CENTER" :
                    positionValue = PrintLine.CENTER;
                    break;
                case "RIGHT" :
                    positionValue = PrintLine.RIGHT;
                    break;
                default:
                    positionValue = PrintLine.LEFT;
                    break;
            }
            try {
                mPrinter.printQRCode(cordova.getActivity(), errorLevel, width, content, positionValue);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("printBitmap")) {
            TRACE.d("printBitmap");
            String base64bitmapString = args.getString(0);
            byte[] bitmapArr = Base64.decode(base64bitmapString, Base64.DEFAULT);
            TRACE.d("bitmaparr:"+bitmapArr.toString()+"\n"+bitmapArr.length);
            Bitmap bitmap = BitmapFactory.decodeByteArray(bitmapArr, 0, bitmapArr.length);
            try {
                mPrinter.printBitmap(mContext, bitmap);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("addText")) {
            TRACE.d("addText");
            String text = args.getString(0);
            TRACE.d("text:"+text);
            try {
                mPrinter.addText(text);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("addTexts")) {
            TRACE.d("addTexts");
            // 处理参数
            String[] texts = new String[2];
            texts[0] = args.getString(0);
            texts[1] = args.getString(1);
            int[] colsWidthArrs = new int[2];
            colsWidthArrs[0] = args.getInt(2);
            colsWidthArrs[1] = args.getInt(3);
            int[] styles = new int[2];
            String styleStringLeft = args.getString(4);
            String styleStringRight = args.getString(5);
            switch (styleStringLeft) {
                case "LEFT" :
                    styles[0] = PrintLine.LEFT;
                    break;
                case "CENTER" :
                    styles[0] = PrintLine.CENTER;
                    break;
                case "RIGHT" :
                    styles[0] = PrintLine.RIGHT;
                    break;
                default:
                    styles[0] = PrintLine.LEFT;
                    break;
            }
            switch (styleStringRight) {
                case "LEFT" :
                    styles[1] = PrintLine.LEFT;
                    break;
                case "CENTER" :
                    styles[1] = PrintLine.CENTER;
                    break;
                case "RIGHT" :
                    styles[1] = PrintLine.RIGHT;
                    break;
                default:
                    styles[1] = PrintLine.LEFT;
                    break;
            }
            TRACE.d("texts:"+texts+"\ncols:"+colsWidthArrs+"\nstyles:"+styles);
            try {
                mPrinter.addTexts(texts, colsWidthArrs, styles);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("addBarCode")) {
            TRACE.d("addBarCode");
            String symbology = args.getString(0);
            int width = args.getInt(1);
            int height = args.getInt(2);
            String content = args.getString(3);
            String position = args.getString(4);
            TRACE.d("symbology:"+symbology+" width:"+width+" height:"+height+" content:"+content+" position:"+position);
            int positionValue;
            switch (position) {
                case "LEFT" :
                    positionValue = PrintLine.LEFT;
                    break;
                case "CENTER" :
                    positionValue = PrintLine.CENTER;
                    break;
                case "RIGHT" :
                    positionValue = PrintLine.RIGHT;
                    break;
                default:
                    positionValue = PrintLine.LEFT;
                    break;
            }
            try {
                mPrinter.addBarCode(mContext, symbology, width, height, content, positionValue);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("addQRCode")) {
            TRACE.d("printQRCodeaddQRCode");
            int width = args.getInt(0);
            String errorLevel = args.getString(1);
            String content = args.getString(2);
            String position = args.getString(3);
            TRACE.d("errorLevel:"+errorLevel+" width:"+width+" content:"+content+" position:"+position);
            int positionValue;
            switch (position) {
                case "LEFT" :
                    positionValue = PrintLine.LEFT;
                    break;
                case "CENTER" :
                    positionValue = PrintLine.CENTER;
                    break;
                case "RIGHT" :
                    positionValue = PrintLine.RIGHT;
                    break;
                default:
                    positionValue = PrintLine.LEFT;
                    break;
            }
            try {
                mPrinter.addQRCode(width, errorLevel, content, positionValue);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("addBitmap")) {
            TRACE.d("printBitmap");
            String base64bitmapString = args.getString(0);
            byte[] bitmapArr = Base64.decode(base64bitmapString, Base64.DEFAULT);
            TRACE.d("bitmaparr:"+bitmapArr.length);
            Bitmap bitmap = BitmapFactory.decodeByteArray(bitmapArr, 0, bitmapArr.length);
            try {
                mPrinter.addBitmap(bitmap);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("addPrintLintStyle")) {
            TRACE.d("addPrintLintStyle");
            int mFontStyle = 0;
            int mPrintLine = 1;
            int mfontSize;
            String bold = args.getString(0);
            TRACE.d("bold:"+bold);
            switch (bold) {
                case "NORMAL" :
                    mFontStyle=PrintStyle.FontStyle.NORMAL;
                    break;
                case "BOLD" :
                    mFontStyle=PrintStyle.FontStyle.BOLD;
                    break;
                case "ITALIC" :
                    mFontStyle=PrintStyle.FontStyle.ITALIC;
                    break;
                case "BOLD_ITALIC" :
                    mFontStyle=PrintStyle.FontStyle.BOLD_ITALIC;
                    break;
                default:
                    break;
            }
            String align = args.getString(1);
            TRACE.d("align:"+align);
            switch (align) {
                case "LEFT" :
                    mPrintLine=PrintLine.LEFT;
                    break;
                case "CENTER" :
                    mPrintLine=PrintLine.CENTER;
                    break;
                case "RIGHT" :
                    mPrintLine=PrintLine.RIGHT;
                    break;
                default:
                    break;
            }
            int fontsize = args.getInt(2);
            TRACE.d("size:"+fontsize);
            mfontSize = fontsize;
            mPrinter.addPrintLintStyle(new PrintLineStyle(mFontStyle, mPrintLine, mfontSize));
        } else if (action.equals("print")) {
            TRACE.d("print");
            try {
                mPrinter.print(mContext);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("setPrinterDensity")) {
            TRACE.d("setPrinterDensity");
            int printerSpeedLevel = args.getInt(0);
            TRACE.d("printerSpeedLevel:"+printerSpeedLevel);
            try {
                mPrinter.setPrinterDensity(printerSpeedLevel);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("setPrinterSpeed")) {
            TRACE.d("setPrinterSpeed");
            int printerSpeedLevel = args.getInt(0);
            TRACE.d("printerSpeedLevel:"+printerSpeedLevel);
            try {
                mPrinter.setPrinterSpeed(printerSpeedLevel);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("getPrinterStatus")) {
            TRACE.d("getPrinterStatus");
            try {
                mPrinter.getPrinterStatus();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("getPrinterDensity")) {
            TRACE.d("getPrinterDensity");
            try {
                mPrinter.getPrinterDensity();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("getPrinterSpeed")) {
            TRACE.d("getPrinterSpeed");
            try {
                mPrinter.getPrinterSpeed();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("getPrinterTemperature")) {
            TRACE.d("getPrinterTemperature");
            try {
                mPrinter.getPrinterTemperature();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (action.equals("getPrinterVoltage")) {
            TRACE.d("getPrinterVoltage");
            try {
                mPrinter.getPrinterVoltage();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return true;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    class MyPrinterListener implements PrintListener {
        @Override
        public void printResult(boolean b, String status, PrinterDevice.ResultType resultType) {
            String result;
            if(b) result = "Success";
            else result = "fail";
            result += "\n" + status+"\n";
            switch (resultType) {
                case PRINT_RESULT:
                    result += "PRINT_RESULT";
                    break;
                case GET_DENSITY:
                    result += "GET_DENSITY";
                    break;
                case GET_SPEED:
                    result += "GET_SPEED";
                    break;
                case GET_TEMPERATURE:
                    result += "GET_TEMPERATURE";
                    break;
                case GET_VOLTAGE:
                    result += "GET_VOLTAGE";
                    break;
                case GET_STATUS:
                    result += "GET_STATUS";
                    break;
                default:
                    break;
            }


            callbackKeepResult(PluginResult.Status.OK, true, "printerPluginListener", "printResult", result);
        }
    }

    public void callbackKeepResult(PluginResult.Status status, Boolean isKeep, String key, String event,
                                   String message) {
        if (!map.containsKey(key)) {
            return;
        }
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("event", event);
            jsonObject.put("message", message);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        pluginResult = new PluginResult(status, jsonObject);
        pluginResult.setKeepCallback(isKeep);
        CallbackContext callbackContext = new CallbackContext((String) map.get(key), webView);
        callbackContext.sendPluginResult(pluginResult);
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        // TODO Auto-generated method stub
        super.initialize(cordova, webView);
        this.mContext = cordova.getActivity();
        this.webView = webView;
    }

}
