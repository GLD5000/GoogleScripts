function BulkHelp() {
  var html = HtmlService.createHtmlOutputFromFile('BulkHelp')
      .setTitle('Bulk Help')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}

function MathsSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('MathsSidebar')
      .setTitle('Mathematics Worksheet Helper')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}

function editingSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('editingSidebar')
      .setTitle('Editing Sheets')
      .setWidth(120);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}
