
function DeleteCurrSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // get Active spreadsheet
  var sh = ss.getActiveSheet(); // get active sheet
  var nextSheet = ss.getSheets()[sh.getIndex()];  
  var prevSheet = ss.getSheets()[sh.getIndex() - 2];  
  prevSheet?   ss.setActiveSheet(prevSheet):ss.setActiveSheet(nextSheet);
  ss.deleteSheet(sh);  
};
