function onOpen() {////////////////////////////////////////////////   onOpen()  ///////////////////////////////////////////////////////////////////////////////
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('📌    Custom Scripts GD')
  .addItem('Show worksheet helper sidebar...', 'MathsSidebar')
  .addSeparator()
  .addItem('Delete current sheet...', 'DeleteCurrentSheet')
  .addSeparator()
  .addSubMenu(ui.createMenu('✘    Delete Rows or Columns...')    
              .addItem('Delete unused rows & columns...', 'CroptoData')
              .addSeparator()
              .addItem('Delete Duplicate Rows...', 'DuplicateRowDelete')
              .addSeparator()
              .addItem('Delete Rows containing selected value...', 'DeleteRowMatching'))
  
  .addSeparator()
  .addSubMenu(ui.createMenu('👀    Show/Hide Sheets...')    
              .addItem('Show all sheets...', 'ShowAllSheets')
              .addItem('Show only Selected sheet...', 'ShowOnlyActiveSheet')
              .addSeparator()
              .addItem('Create contents/visibilty sheet...', 'CreateVisibilitySheet'))
              
  
  .addSeparator()
  .addSubMenu(ui.createMenu('📄   Bulk Create Sheets...') 
              .addItem('❓', 'BulkHelp')
              .addSeparator()
              .addItem('Bulk Copy Based on Cell and Data Validation...', 'BulkCellDV')
              .addSeparator()
              .addItem('Bulk Copy Based on a List...', 'BulkCellList')
              .addItem('Create bulk list from selection...', 'CreateBulkListNR')
             .addSeparator()
              .addItem('Delete Bulk Copies...', 'BulkCellDV'))
             
  .addSeparator()
  .addSubMenu(ui.createMenu('📝  Named Ranges...')    
              .addItem('Create Named Ranges for Active Sheet...', 'SplitSelectedNames')
             .addItem('Create Named Ranges for All Sheets...', 'rangeNamer')
               .addSeparator()
             .addItem('Create Named Ranges Index Sheet...', 'CreateNRSheet')
             .addItem('Update Named Ranges Index Sheet...', 'rangeUpdater')
               .addSeparator()
             .addItem('Delete Created Named Ranges...', 'SplitSelectedNames')
             .addItem('Delete All Named Ranges...', 'clearNamedRanges'))
  
  .addSeparator()
  .addSubMenu(ui.createMenu('👨   Processing Pupil Data...')    
              .addItem('Split Selected Names...', 'SplitSelectedNames'))
             
  
  .addSubMenu(ui.createMenu('💻    Convert selected Non-Standardised Scores to...')
  .addItem('Raw Score to S-Score', 'NormaliseSelectedScores')
              .addSeparator()
  .addItem('Raw Score to Four Grades', 'normaliseandFourGrade')
              .addSeparator()
  .addItem('Raw Score to Nine Numerical Grades', 'NormaliseAndStanineNumerical') 
  .addItem('Raw Score to Nine Verbal Grades', 'NormaliseAndStanineGrades'))
  
  .addSubMenu(ui.createMenu('💻    Convert selected Standardised Scores to...')
  .addItem('S-Score to Four Simple Verbal Grades', 'SelectedToFourGrades')
  .addSeparator() 
  .addItem('S-Score to Nine Numerical Grades', 'SelectedStanineNumerical') 
  .addItem('S-Score to Nine Verbal Grades', 'SelectedStanineGrades')
  .addSeparator()        
  .addItem('S-Score to T-Score', 'NSStoPIPS')
  .addItem('T-Score to S-Score', 'PIPStoNSS')
  .addItem('S-Score to Z-Score', 'NSStoZScores'))
  .addToUi();

}//////////////////////////////////////////////// onOpen()  ///////////////////////////////////////////////////////////////////////////////
