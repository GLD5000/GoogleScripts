
function editingSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('editingSidebar')
      .setTitle('Editing Sheets')
      .setWidth(120);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}
