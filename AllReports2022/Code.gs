

function onEdit(e) {//TRIGGERS DIFFERENT FUNCTIONS BASED ON WHICH CELL WAS JUST EDITED
  var ss = SpreadsheetApp.getActiveSpreadsheet();
var s = SpreadsheetApp.getActiveSheet(); //gets active sheet
  
// when editing comment caller sheet ....
  
if( s.getName() == "Comment Caller" ) { //checks active sheet is the correct sheet
  var notation = e.range.getA1Notation();//GETS A1 NOTATION TO FEED IF COMPARISIONS
 var comval = ss.getRange('CommentOne').getValue(); // get comments to check if blank
   
  
  var namerange = ss.getRange('Name'); // gets name range to change name cell
  var name = namerange.getValue(); // gets the current name
  var FinalEdit = ss.getRange('FinalEdit').getValue(); // gets Final Edit TRue or False
  
  if (notation === 'B3'){//IF YOU CHANGE THE CHILD'S NAME CELL, DELETE THE COMMENTS
  //if not cleared then clear
    if (comval != ""){
      clear() ;
                    }
  }else if (notation === 'C19'){// AFTER YOU FINISH THE COMMENT, COPIES IT TO A HOLDING CELL FOR EDITING
  edit();
    if (FinalEdit == 0){//checks if the final edit is NOT required
  copy();
  clear();
  namerange.setValue(nextname(name)); // sets next name
    }//end if final edit false
 }else if (notation === 'B21'){//AFTER YOU EDIT THE TEXT IN THE HOLDING CELL, COPIES THE COMMENT DOWN BELOW
  copy();
  clear();
  namerange.setValue(nextname(name)); // sets next name
  
  }else if (notation === 'B1'){//Change the subject- insert a line
  s.insertRowsAfter(22, 1);  
    
    namerange.setValue(ss.getRange('FirstPupil').getValue()); // sets next name
    removeDuplicates(); //removes duplicates
    clear();
  } else if (notation === 'B2'){//Change the subject- insert a line
    clear();
}//end if B1
}//end if Comment Caller
  
  
  
}// end on edit function

function nextname(e){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pupil Names"); //get sheet
  var range = sheet.getDataRange(); // get range
  var data = range.getValues(); // get names as array
//  Logger.log(data);
 for(i in data){
   var name = data[i];
  
    if (name == e){
  //    Logger.log(i);
    //  Logger.log(name);
      var j = +i+1; // '+' or parseInt() can be used to force a number
      var newname = data[j];
      //Logger.log(j);
     // Logger.log(newname);
      return newname;
      break;
    }//end if name match
    
  }//end for loop
}//end function


function removeDuplicates() { //removes duplicates in active sheet
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Comments");
  var range = sheet.getDataRange();
  var data = range.getValues();
  var newData = new Array();
  for(i in data){
    var row = data[i];
    var duplicate = false;
    for(j in newData){
      if(row.join() == newData[j].join()){
        duplicate = true;
      }
    }
    if(!duplicate){
      newData.push(row);
    }
  }
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length)
      .setValues(newData);
  var range = sheet.getDataRange();
  cropToRange(range);
}  

function copy() { //COPIES THE COMMENT TO A PARTICULAR CELL
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();// GET SHEET
  var TinC = ss.getRange('TargetInComment').getValue(); // See if Comment contains Target
  ss.insertRowsAfter(22, 1);  
   //Comment 
  var destCell = ss.getRange('C23')// SET  DESTINATION RANGE
   var value = ss.getRange('B21').getValue();// GET  VALUE 
    destCell.setValue(value); //COPIES DOWN
    //Name
  var nvalue = ss.getRange('B3').getValue();// GET  VALUE 
 var nameCell = ss.getRange('B23')// SET  DESTINATION RANGE 
 nameCell.setValue(nvalue); //COPIES DOWN
 //Target
  if (TinC == 0){//If Comment not containing target, copy the target
    var tvalue= ss.getRange('B19').getValue();// GET target VALUE OF CELL 'B19' the pupil target
    var targetcell = ss.getRange('D23')// SET TARGET RANGE AS 'd23'
    targetcell.setValue(tvalue); //COPIES THE target DOWN   
                    }
  // Grade
   var gdestCell = ss.getRange('J23')// SET  DESTINATION RANGE 
   var gvalue = ss.getRange('B22').getValue();// GET  VALUE 
    gdestCell.setValue(gvalue); //COPIES  DOWN
   
//Subject
     var svalue = ss.getRange('B1').getValue();// GET name VALUE OF CELL 'B1'
 var subCell = ss.getRange('A23')// SET name DESTINATION RANGE AS 'A23'
 subCell.setValue(svalue); //COPIES THE name DOWN
 //IMPORTS NEW COMMENTS TO COMMENTS SHEET
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Comments");
 sheet.insertRowsAfter(1, 16);  //insert 16 rows for da copy 
  var newcommT = sheet.getRange('a2:e17')// SET new comments target range
  var newcomm = ss.getRange('E4:I19')// SET new comments range
  
  newcomm.copyTo(newcommT, {contentsOnly:true})
  
  };

 function edit() { 
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var value = ss.getRange('B20').getValue();
 ss.getRange('B21').setValue(value);
  // var range = ss.getRange('B5'); set active range does not work
  // setActiveRange(range)
  };
 function clear() { 
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Comment Caller");
   ss.getRange('B4:B19').setValue("");
 ss.getRange('B21:22').setValue("");
var ll = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("List maker");
  var lr = ll.getRange("A4:S200"); 
   lr.clear();
   ss.setActiveSelection('B1');
   ss.setActiveSelection('B4');
  
  };



function cropToData() {
  console.log('Cropping to data');
  var range = SpreadsheetApp.getActiveSheet().getDataRange();
  cropToRange(range);
}

/**
 * Crops the sheet such that it only contains the given range.
 * @param {SpreadsheetApp.Range} range The range to crop to.
 */
function cropToRange(range) {
  var sheet = range.getSheet();
  var spreadsheet = sheet.getParent();
  var firstRow = range.getRow();
  var lastRow = firstRow + range.getNumRows() - 1;
  var firstColumn = range.getColumn();
  var lastColumn = firstColumn + range.getNumColumns() - 1;
  var maxRows = sheet.getMaxRows();
  var maxColumns = sheet.getMaxColumns();

  if (lastRow < maxRows) {
    sheet.deleteRows(lastRow + 1, maxRows - lastRow);
  }
  if (firstRow > 1) {
    sheet.deleteRows(1, firstRow - 1);
  }
  if (lastColumn < maxColumns) {
    sheet.deleteColumns(lastColumn + 1, maxColumns - lastColumn);
  }
  if (firstColumn > 1) {
    sheet.deleteColumns(1, firstColumn - 1);
  }
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  //showCompleteMessage(spreadsheet);
}
