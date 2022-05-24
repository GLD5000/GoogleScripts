function testOutOfBounds(){
  const sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sh.getRange('A1');
  let val;
 try {
  range.offset(100,0);
  } catch {
   val = false;
  }
let dummy = range.offset(100,0);
  console.log(typeof dummy.getDataValidation().getCriteriaType());

}

function onEdit(e){
  const val = e.value;// get value of current cell
  const range = e.range; // get range
  const type = range.getDataValidation().getCriteriaType(); // get type CHECKBOX?
  const alertArr = [];

  if (val == 'TRUE' && type == 'CHECKBOX'){

    const offsetArray = [[-1,0],[1,0],[0,-1],[0,1]]; //up down left right

        let focusRange;
    for (let i in offsetArray) {

        let inRange = true; // reset in range val
        let dummy = undefined;
        focusRange = range; // reset range

        try { // try for out of bounds
         dummy = focusRange.offset(...offsetArray[i]).getDataValidation().getCriteriaType();
        } catch {
          inRange = false;
        }
        

        while (inRange == true &&  focusRange.offset(...offsetArray[i]).getDataValidation().getCriteriaType() == 'CHECKBOX') {

        focusRange = focusRange.offset(...offsetArray[i]); //up
        focusRange.setValue(false);
                try {
         dummy = focusRange.offset(...offsetArray[i]).getDataValidation().getCriteriaType();
        } catch {
          inRange = false;
        }

        }

      }

  } else {
    return;
  }  
}

function radio(e,RadioRange){//checks if button is in a known range

  // Check row and exit if not in range
  var thisRow = e.range.getRow();//get row
  if (thisRow < RadioRange.getRow() || thisRow > RadioRange.getLastRow()) return; //Quits if out of bounds

  // check column and exit if out of range
  var thisCol = e.range.getColumn();// get col
  if (thisCol < RadioRange.getColumn() || thisCol > RadioRange.getLastColumn()) return; // Quits if out of bounds

  // clear range and reinstate current cell value
  var val = e.value;// get value of current cell
  RadioRange.clear();
  e.range.setValue(val);
  
} 

function checkboxrange(e) { //finds contigous range of checkboxes
var ss = e.range.getSheet();// get sheet
return  ss.getRange(1,1,8,1); //get range of radio buttons
  
}

function checkboxdetectrange(e) { //finds contigous range of checkboxes
var ss = e.range.getSheet();// get sheet
 
var curRow = e.range.getRow(); // gets current Row
var curCol = e.range.getColumn(); // gets current Column
var firstRow = curRow // set current as first row for now
// first row loop

for (var i = -1; i > -10; i--) { 
  Logger.log(e.range.offset(i,0).getDataValidation().getCriteriaType());
  Logger.log((e.range.offset(i,0).getDataValidation().getCriteriaType()) != "CHECKBOX");
  if ((e.range.offset(i,0).getDataValidation().getCriteriaType()) != "CHECKBOX") return;
 firstRow = (curRow*1) + (1*i);
Logger.log(firstRow)  ;
  } 
return  ss.getRange(1,1,8,1); //get range of radio buttons
  
}
