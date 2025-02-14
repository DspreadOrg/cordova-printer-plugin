cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "posPrinterPlugin.dspread_pos_printer_plugin",
      "file": "plugins/posPrinterPlugin/www/dspread_pos_printer_plugin.js",
      "pluginId": "posPrinterPlugin",
      "clobbers": [
        "cordova.plugins.dspread_pos_printer_plugin"
      ]
    }
  ];
  module.exports.metadata = {
    "posPrinterPlugin": "1.0.1"
  };
});