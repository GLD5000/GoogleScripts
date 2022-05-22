pipe = (...fns) => (x) => fns.reduce((v,f) => f(v),x);
compose = (...fns) => (x) => fns.reduceRight((v,f) => f(v),x);

log = (x) => {console.log(x); return x};

upper = (x) => x.toUpperCase();

lower = (x) => x.toLowerCase();

function deepCopyObject(obj){
//end recursion
  if (obj === null || typeof obj !== "object") return obj;

// new target array or object
  const newObject = Array.isArray(obj)? []: {};

  for (let key in obj){
    const value = obj[key];
    // start recursion
    newObject[key] = deepCopyObject(value);
  }
  
  return newObject;
}

function testDeepCopy(){
/*

const obj = {1: 1,
2: 2,
3: [3],
4: [[4,[5,6]],7,8,9]
}
log(deepCopyObject(obj));

const obj = "hello";
log(deepCopyObject(obj));

*/
const arr = [1,2,3,[4,[5,6]],7,8,9];
log(deepCopyObject(arr));


}

function testArray(){

const arr = Array(3).fill([1,2,3,[4,[5,6]],7,8,9]);
//const arr = [[1,2,3,[4,[5,6]],7,8,9],[1,2,3,[4,[5,6]],7,8,9],[1,2,3,[4,[5,6]],7,8,9]];
const arrB = arr;
log(arr[0][3][1][1]);
const arrC = log(arrB);
arr[0][2] = "Hello";
arrC[1][3][0] = "Goodbye";

log(arr[0][3]);
log(arrB[1][3][1][1]);
log(arrC);

arrD = Array(10).fill(5);
arrD[2] = "hell0";
log(arrD);

arrE = Array(10).fill([5]);
arrE[2][0] = "hell0";
log(arrE);


arrF = Array(10).fill([5]);
arrF[2] = ["hell0"];
log(arrF);

function forEach(arr){
arr.forEach((x,i,array) => array[i] = x + i%2)
  return arr;
}

const arrG = forEach(arrF);
arrF[0] = "Test";
log(arrF);
log(arrG);

};

function testPipe(){
pipe(
  log,
  upper,
  log,
  lower,
  log)('Hello');
}

function fillArrays(){
  const arr = Array(10).fill([1,2,3,4,5,6,7,8,9]);
  console.log(arr);

}

function zipArrays(...sourceArr){
  (Array.isArray(this[0]))? this.forEach((x,i,array)=> array[i].push(sourceArr[i])): this.forEach((x,i,array)=> array[i] = [array[i],sourceArr[i]]);
}

function testZip(){
  array1 =[1,2,3];
  array2 = [[4,4],"fisdh",6];
  zipArrays.apply(array1,array2);
  console.log(array1);
  zipArrays.apply(array1,array2);
  console.log(array1);


}

function cartesianProductB(arr){ 
  let totalPermutations = 1;
  const intervalArray = [1];
  const lengthArray = [];
  arr.forEach(x  => {
    let len = x.length;
    totalPermutations *= len;
    lengthArray.push(len);
    intervalArray.push(totalPermutations);
  });
  const permutationsArray = [...Array(totalPermutations).fill([])];
  arr.forEach((x,i,arr) => {
    arr[i].forEach((x,index)=> {
      const length = lengthArray[i];
      const blockSize = intervalArray[i];
      const blockRepeats = (totalPermutations/length)/blockSize;
      const intitalOffset = index * blockSize;
      let blockIndex = 0;
      const blockOffset = blockSize * length;
      let position = 0;
      let r = 0;
      for (blockIndex; blockIndex < blockRepeats; blockIndex++){
        position = intitalOffset + (blockOffset * blockIndex);
        let lastPosition = position + blockSize;
        for (position; position < lastPosition; position++){
          permutationsArray[position].length?permutationsArray[position].push(x):permutationsArray[position] = [x];
        }
      }
    });
  });
  return permutationsArray;
}

function cartesianProductC(){ // for n arrays 
//changing to object oriented style for fun
const arr = [[1,2],[1,2],[1,2],[31,32]];

  cartesianCalculator = {
    totalPermutations: 1,
    intervalArray: [1],
    lengthArray: [],
    permutationsArray: [],

    getNumPermutations(arr) {
      arr.forEach(x  => {
        let len = x.length;
        this.totalPermutations *= len;
        this.lengthArray.push(len);
        this.intervalArray.push(this.totalPermutations);
      })
      return arr; //makes it pipe-able
    },

    createPermutationsArray(arr){
      this.permutationsArray = [...Array(this.totalPermutations).fill([])];
      // outer loop through n arrays
      arr.forEach((x,i,arr) => {
        // inner loop through m items in each array
          arr[i].forEach((x,index)=> {
          const length = this.lengthArray[i];
          const totalRepeats = this.totalPermutations/length;
          const blockSize = this.intervalArray[i];
          const blockRepeats = totalRepeats/blockSize;
          const intitalOffset = index * blockSize;
          let blockIndex = 0;
          const blockOffset = blockSize * length;
          let position = 0;
          let r = 0;
          // loop to fill permutations array for b blocks
          for (blockIndex; blockIndex < blockRepeats; blockIndex++){

            position = intitalOffset + (blockOffset * blockIndex);
            let lastPosition = position + blockSize;
            // innermost loop to add i items in each block
            for (position; position < lastPosition; position++){

              this.permutationsArray[position].length?this.permutationsArray[position].push(x):this.permutationsArray[position] = ([x]);

            }
          }
        });
      });
      return permutationsArray;
    }
  }
  //cartesianCalculator.getNumPermutations(arr);
  //console.log(cartesianCalculator.totalPermutations)// got up to here refactoring into oop
  
}


function cartesianProduct(arr){
  if (arr.length == 2) {
    const [a,b] = arr;
    return a.flatMap(a => b.map(b => [a,b]));
  } else if (arr.length > 2){
    let i = arr.length - 2;
    let array = arr;
    for (i; i>0; i--){
    const [a,b,...c] = array;
    array = i==arr.length - 2? [a.flatMap(a => b.map(b => [a,b])),...c] : [a.flatMap(a => b.map(b => [...a,b])),...c];
    }
    const [a,b] = array;
    return a.flatMap(a => b.map(b => [...a,b]));

  }
}

function testCartesianProduct(){
//arr = [[1,2],[1,2],[1,2],[31,32]];
//arr = [[1,2],[2],[31,32]];
const arr = [[1,2],[10,20],[100,200]];
log(cartesianProduct(arr));
log(cartesianProductB(arr));
log(cartesianProductC(arr));

}

function arrIndexes(){
  console.log([...Array(10).keys()]);
}

function arrIndexesB(){
 const arr = [...Array(10)];
 arr.forEach((_,i,arr) => arr[i] = i);
console.log(arr);
}


function arrayn(){
  const n = 5;
  const arrA = Array(n).fill();
  const arrB = Array.from(Array(n));
  const arrC = [...Array(n)];

  console.log([arrA,arrB,arrC]);
}


function nameComparison(){// beginning of name comparison script
  
var name = "Gareth Devlin"

var low = name.toLowerCase();

var myArr = Array.from(low).sort();
  
  // loop through array a comparing to b until you get a match and then add to a counter for each matched letter and compare to the length of the word
}//////////////////////////////////////////////////// Name Comparison

function randNumberArray(len){
  return [...Array(len)].map((_,index) => index).reduceRight((a,b,i,shuffArray) => {  rand = Math.floor(Math.random() * (i + 1));
  [shuffArray[rand],shuffArray[i]] = [shuffArray[i],shuffArray[rand]];
  return shuffArray;
},[]);
}

function testrandNumberArray(){
  console.log(randNumberArray(12));
}


function randNumberArrayEach(len){

  const array = [...Array(len)].map((_,index) => index);

  array.forEach((_,i,shuffArray) => {  

    rand = Math.floor(Math.random() * (len - i));
    [shuffArray[rand],shuffArray[len - 1 - i]] = [shuffArray[len - 1 - i],shuffArray[rand]];

  });

  return array;
  
}


function testrandNumberArrayEach(){
  console.log(randNumberArrayEach(12));
}

function shuffArray(array) {
  return array.reduceRight((a,b,i,shuffArray) => {  rand = Math.floor(Math.random() * (i + 1));
  [shuffArray[rand],shuffArray[i]] = [shuffArray[i],shuffArray[rand]];
  return shuffArray;
  },[]);
}

function testshuffArray(){
  console.log(shuffArray([1,2,3,4,5,6,7]))
}


function shuffArrayEach(array) {
  const arrLen = array.length-1;
  return array.forEach((_,i,shuffArray) => {  rand = Math.floor(Math.random() * (arrLen - i + 1));
  [shuffArray[rand],shuffArray[arrLen - i]] = [shuffArray[arrLen - i],shuffArray[rand]];
  });
}
function shuffArrayEach(){
  console.log(shuffArray([1,2,3,4,5,6,7]))
}




function shuffle(array) {
let len = array.length;
const shuffArray = [...Array(len)].map((_,index) => index).reduceRight((a,b,i,shuffArray) => {  rand = Math.floor(Math.random() * (1 + i));
  [shuffArray[i],shuffArray[rand]] = [shuffArray[rand],shuffArray[i]];
  return shuffArray;
},[]);
  /*console.log(shuffArray);
  randArr = [];
  indexArr = [];
for (let i = len-1; i >= 0; i--) {
  rand = Math.floor(Math.random() * (i + 1));
  randArr.push(rand);
  indexArr.push(i);

  [shuffArray[rand],shuffArray[i]] = [shuffArray[i],shuffArray[rand]];
}
console.log(randArr);
console.log(indexArr);*/

return shuffArray;
  
}

function testShuffle() {
  const array = [1,2,3,4,5,6,7,8,7,6,5,4,2];
  console.log(shuffle(array));
}


//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//Generic Functions - Single Function Blocks
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//TESTER
function testFunctions(){////////////////////////////////////// function testFunctions()
  
var val = getSelectedValues()// getSelectedValues() /////  Gets values from active Range in sheet
 //var norm = normalise(val); // normalise(Array) // normalises a given range of numerical values 
  //toNewColumn(norm,"fish");// toNewColumn(Array,'Title') // inserts data to column inserted before active range (Title is optional)
// Logger.log(val);
 // Logger.log(norm);
 
      
      ;  // returns true if missing number type
  Logger.log(MissingNumberTest(val));
  
  //toSameColumn(rand,"Randomised");// toNewColumn(Array,'Title') // inserts data to column inserted before active range (Title is optional)
 // Logger.log(getDVValues());
 
}////////////////////////////////////// function testFunctions()

function MissingNumberTest(e){
  var val = e.toString().replace(/_/g,"").replace(/ /g,"");// replace underscores and spaces with nothing
  var equ = val.indexOf("=")+1;
  var len = val.length;
  var ran = "";
  if (equ !== len){
   return "True";
    }else{
     return "False";
    }// end if
      
       // returns true if missing number type
 
  
}///////////////////////////////////////////////////// Missing Number Test (e)

function A1NotationFirstDataCell(sheetname){ /////////////////////////////////////A1NotationFirstDataCell(sheetname)
  
 //Returns A1 notation of first data populated cell  
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // GET SPREADSHEET
//  var sh = ss.getActiveSheet();//GET CURRENT SHEET
  
  var sh = ss.getSheetByName(sheetname);//GET CURRENT SHEET
  var r = sh.getDataRange(); // GET DATA RANGE
  var lastRow = r.getLastRow(); // Get Last R
  var lastColumn = r.getLastColumn(); // Get Last C
  
  //Loop through rows and columns to check values
  // Get array of values in the search Range
  var rangeValues = r.getValues();
  // Loop through array and if condition met, add relevant
  // background color.
var j = 0
  for ( i = 0 ; i < lastColumn ; i++){ //Column Loop
    
    //  if(rangeValues[j],[i].length = 0){ //Test if NOT blank
      for ( j = 0 ; j < lastRow - 1; j++){ // Row Loop
        if(rangeValues[j][i].length > 0){ //Test if NOT blank
      
      break;
      }
    }
    if(rangeValues[j][i].length > 0){ //Test if NOT blank
      
      break;
      }
    }
  var firstcell =  sh.getRange(j+1,i+1).getA1Notation(); // Get first non-blank cell
  return firstcell ;
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
}///////////////////////////////////////////////////////////////////////////////A1NotationFirstDataCell(sheetname)

function FindFirstDataCell(sheetname){  //////////////////////////////////////////////// FindFirstDataCell(sheetname) //////
  //Returns A1 notation of first data populated cell
  
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // GET SPREADSHEET
//  var sh = ss.getActiveSheet();//GET CURRENT SHEET
  
  var sh = ss.getSheetByName(sheetname);//GET CURRENT SHEET
  var r = sh.getDataRange(); // GET DATA RANGE
  var lastRow = r.getLastRow(); // Get Last R
  var lastColumn = r.getLastColumn(); // Get Last C
  
  //Loop through rows and columns to check values
  // Get array of values in the search Range
  var rangeValues = r.getValues();
  // Loop through array and if condition met, add relevant
  // background color.
var j = 0
  for ( i = 0 ; i < lastColumn ; i++){ //Column Loop
    
    //  if(rangeValues[j],[i].length = 0){ //Test if NOT blank
      for ( j = 0 ; j < lastRow - 1; j++){ // Row Loop
        if(rangeValues[j][i].length > 0){ //Test if NOT blank
      
      break;
      }
    }
    if(rangeValues[j][i].length > 0){ //Test if NOT blank
      
      break;
      }
    }
  var firstcell =  sh.getRange(j+1,i+1).getA1Notation(); // Get first non-blank cell
  return firstcell ;
 
} ////////////////////////////////////////////////////////////////////////////////////// FindFirstDataCell(sheetname) //////

function AlphabetiseName(name){// Takes in name and outputs array in alphabetical order that can be iterated through
  
let nameA = "Gareth Devlin".toLowerCase().split('');

let nameB = "Garry Devlin".toLowerCase().split('').filter(x => nameA.indexOf(x) === -1);




console.log(nameB);

  
  // loop through array a comparing to b until you get a match and then add to a counter for each matched letter and compare to the length of the word
}//////////////////////////////////////////////////// Name Comparison

function randomise(arra1) {///// randomise(array)
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}  /////////////////////////// randomise(array)

function toNewColumn(Array,Title){//////////////// toNewColumn(Array,Title) // inserts data to column inserted AFTER active range (Title is optional)
var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
var sh = ss.getActiveSheet();// get sheet
var range = sh.getActiveRange();//get active range
  sh.insertColumnAfter(range.getColumn());//insert column
 var writerange = sh.getRange(range.getRow(),range.getColumn()+1,Array.length,1);  //select range val.length
 writerange.setValues(Array); //set values
  writerange.activate();
  if (Title){
  if (range.getRow()>1){
  sh.getRange(range.getRow()-1,range.getColumn()+1).setValue(Title);
  }//end if (range.getRow()>1) END
    }/////////////////////////////////END if (Title) END
}//////////////////////////////////////////////function ArrayToNewColumn(e)

function toSameColumn(Array){//////////////// toSameColumn(Array,Title) // inserts data to column inserted AFTER active range (Title is optional)
var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
var sh = ss.getActiveSheet();// get sheet
var range = sh.getActiveRange();//get active range
range.setValues(Array); //set values

 
}//////////////////////////////////////////////function ArraytoSameColumn(e)


function HelpForStandardisedScores(){
}////////////////////////////////////////////////////////////HelpForStandardisedScores

function getDVValues(e){////////////////////////getDV()  ///////////
  if (e == null){
   
     var r = getSelectedRange();
   var v =  r.getDataValidation().getCriteriaValues();
    Logger.log('E is undefined');
  }else{
    e.getDataValidation().getCriteriaValues();
  }
try {
return v[0].getValues();
} catch(err) { Logger.log('getValues Failed')
             try{return SliceArray(v[0]);
} catch(err) { Logger.log('Slice Failed')}}
  
}////////////////////////getDV()  ///////////

function getSelectedRange(){////////////////////////////function getSelectedRange()

return SpreadsheetApp.getActiveRange();//get active range

}////////////////////////////function getSelectedRange()

function getSelectedValues(){/////////////////// getSelectedValues() /////  Gets values from active Range in sheet
var range = SpreadsheetApp.getActiveRange();//get active range;//get active range
return range.getValues();//get values
}////////////////////////////function getSelectedValues()

function stanine(Array){//////////////////////////   stanine(Array)
   var Stanine = [];//stanine array
  var stanines = [];
  for (i in Array){
    if (val[i] >=126.25){
    Stanine.push('9');// push grade
    }else if (val[i] >=118.75){
    Stanine.push('8');// push grade
    }else if (val[i] >=111.25){
    Stanine.push('7');// push grade
      }else if (val[i] >=103.75){
    Stanine.push('6');// push grade
    }else if (val[i] >=96.25){
    Stanine.push('5');// push grade
    }else if (val[i] >=88.75){
    Stanine.push('4');// push grade
    }else if (val[i] >=81.25){
    Stanine.push('3');// push grade
    }else if (val[i] >=73.75){
    Stanine.push('2');// push grade
    }else {
    Stanine.push('1');// push grade
        }//END if if (val[i] >126.25) END
  }//END for (i in val){ END
 // Logger.log(val);
  //Logger.log(Stanine);
var stanines = SliceArray(Stanine);
  return stanines;
}//////////////////////////   stanine(Array)

function staninegrade(Array){//////////////////////////   staninegrade(Array)
     var Stanine = [];//stanine array
  var stanines = [];
   for (i in val){
    if (val[i] >=126.25){
    Stanine.push('Very High');// push grade
    }else if (val[i] >=118.75){
    Stanine.push('High');// push grade
    }else if (val[i] >=111.25){
    Stanine.push('Above Average');// push grade
      }else if (val[i] >=103.75){
    Stanine.push('High Average');// push grade
    }else if (val[i] >=96.25){
    Stanine.push('Average');// push grade
    }else if (val[i] >=88.75){
    Stanine.push('Low Average');// push grade
    }else if (val[i] >=81.25){
    Stanine.push('Below Average');// push grade
    }else if (val[i] >=73.75){
    Stanine.push('Low');// push grade
    }else {
    Stanine.push('Very Low');// push grade
        }//END if if (val[i] >126.25) END
  }//END for (i in val){ END
 // Logger.log(val);
  //Logger.log(Stanine);
var stanines = SliceArray(Stanine);
  return stanines;
}//////////////////////////   staninegrade(Array)

function simplegrade(Array){//////////////////////////   simplegrade(Array)
     var Stanine = [];//stanine array
  var stanines = [];
    for (i in val){
    if (val[i] >=118.75){
    Stanine.push('High');// push grade
    }else if (val[i] >=111.25){
    Stanine.push('Above Average');// push grade
    }else if (val[i] >=88.75){
    Stanine.push('Average');// push grade
    }else {
    Stanine.push('Below Average');// push grade
    }//END if if (val[i] >126.25) END
  }//END for (i in val){ END
 // Logger.log(val);
  //Logger.log(Stanine);
var stanines = SliceArray(Stanine);
  return stanines;
}//////////////////////////   simplegrade(Array)

function normalise(Array){/////////////////////////////////////function normalise(e) // normalises a given range of numerical values
//var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
//var sh = ss.getActiveSheet();// get sheet
//var range = sh.getActiveRange();//get active range
//var val = range.getValues();//get values
var numval = Array.length; // number of values
var numsamp = numval-1;// number to use for st.dev
var total = Array.reduce(myFunc); //total of values

function myFunc(total, num) {//total of values
  return (1*total) + (1*num);//total of values
}
  
var average = total/numval; // average of values

  var diffs = Array.map(function(value){//
var diff = Math.pow(((1*value) - average), 2);//differences squared
  return diff;
});
var diffstot = diffs.reduce(myFunctwo);// St.Dev Pop -1
 function myFunctwo(totalz, numz) {
  return totalz + numz;
}
var stDev = Math.sqrt(diffstot / numsamp);
var Normed = Array.map(function(valuee){
  var norm = []
  norm.push(Math.round((((1*valuee - average)/stDev)*15)+100));
  return norm;
});  
  
  return Normed;
}/////////////////////////////////////function normalise(e)

function ShowAllSheets() { /////// hideAllSheetsExcept(sheetName)////// old script that hid every sheet except the table maker when creating a USER COPY of the database
 
var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheets = ss.getSheets();
  for (i in sheets){
      sheets[i].showSheet();
    }
  
  
}////////////////////////////////////////////////////// showAllSheets   END


function hideAllSheetsExcept(sheetName) { /////// hideAllSheetsExcept(sheetName)////// old script that hid every sheet except the table maker when creating a USER COPY of the database
 
var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheets = ss.getSheets();
  var chosen = ss.getSheetByName(sheetName);
 chosen.showSheet();
  //SpreadsheetApp.flush();
  for(var i =0;i<sheets.length;i++){
   // Logger.log(i);
    if(sheets[i].getName()!=sheetName){
      sheets[i].hideSheet();
    }
  }
  
}////////////////////////////////////////////////////// hideAllSheetsExcept(sheetName) END

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//Generic Functions - Single Function Blocks    END END END
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//Combination Functions - Complex Function Blocks    START START START
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function RandomiseSelectedSums(){//////////////////////////RandomiseSelectedSums()
  var val = getSelectedValues();// getSelectedValues() /////  Gets values from active Range in sheet
  var rand = randomise(val);
  toSameColumn(rand,"");// toNewColumn(Array,'Title') // inserts data to column inserted before active range (Title is optional)
 // Logger.log(getDVValues());
}//////////////////////////////////////////////////////////RandomiseSelectedSums()

function DeleteCurrentSheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // get Active spreadsheet
  var sh = ss.getActiveSheet(); // get active sheet
  var nextSheet = ss.getSheets()[sh.getIndex()];  
  var prevSheet = ss.getSheets()[sh.getIndex() - 2];  
  prevSheet?   ss.setActiveSheet(prevSheet):ss.setActiveSheet(nextSheet);
  ss.deleteSheet(sh);  
}//DeleteCurrentSheet

function ShowOnlyActiveSheet(){//////////////////////////// ShowOnlyActiveSheet()
  var sheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
  Logger.log(sheetName);
  hideAllSheetsExcept(sheetName);
}//////////////////////////// ShowOnlyActiveSheet()


function HidShe(){ // hides the three helper sheets
   var ss = SpreadsheetApp.getActiveSpreadsheet(); // get Active spreadsheet
  var tem = ss.getSheetByName("DataEntry"); //gets template sheet
 var de = ss.getSheetByName("New Style Data Entry"); //gets macro sheet 
  var dv = ss.getSheetByName("Data Validation"); //gets dv sheet 
  var pup = ss.getSheetByName("Copy of LookupPupilData"); //gets pupil sheet 
  tem.hideSheet();
  de.hideSheet();
  dv.hideSheet();
  pup.hideSheet();
}
function UnHidShe(){ // shows the three helper sheets
   var ss = SpreadsheetApp.getActiveSpreadsheet(); // get Active spreadsheet
  var tem = ss.getSheetByName("DataEntry"); //gets template sheet
 var de = ss.getSheetByName("New Style Data Entry"); //gets macro sheet 
  var dv = ss.getSheetByName("Data Validation"); //gets dv sheet 
  var pup = ss.getSheetByName("Copy of LookupPupilData"); //gets pupil sheet 
  tem.showSheet();
  de.hideSheet();
  dv.showSheet();
  pup.showSheet();
}
function removeHidden() { // deletes all hidden sheets
    var ss = SpreadsheetApp.getActive()
    UnHidShe();// shows the three helper sheets
    ss.getSheets()
        .map(function (sh) {
            if (sh.isSheetHidden()) ss.deleteSheet(sh)

        })
}

function BulkIndividualz() { // copies a list of names from 'list of names for batch loop' to new sheets using the GL master sheet and lists them in 'list of sheet names' sheet
 var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetnames = ss.getSheetByName('List of Sheet Names'); //get sheet which newly created sheet names will be in for later deletion
  var namesheet = ss.getSheetByName('List of names for batch loop');// get list of names sheet
  var namelist = namesheet.getRange('A1').getDataRegion().getValues();//get name values as 'namelist'
  var tablesheet =  ss.getSheetByName('Table Maker');// get table maker
  var mastersheet = ss.getSheetByName('Individual GL Master');//get master sheet
  var hh = ss.getSheetByName("Query Helper");
  var date = Utilities.formatDate(new Date(), "GMT", "dd/MM/yy")
  //LOOP
  for(i in namelist){ //for each in the namelist
   // set variables
  
    var name = namelist[i]; // get current name
  
   var newname = name + " " + date
   
   tablesheet.getRange('PupilNameCell').setValue(name);// change name in cell = PupilNameCell
    
  var firstRow = hh.getRange('TableFirstRow').getValue(); //gets first row
  var firstCol = hh.getRange('TableFirstCol').getValue(); //gets first column
  var lastRow = hh.getRange('TableNumRow').getValue(); // gets last row
  var lastCol = hh.getRange('TableNumCol').getValue();  //gets last column
    
  var tableRange = tablesheet.getRange(firstRow,firstCol,lastRow,lastCol);// get table

    ss.insertSheet().setName(newname); //make new sheet
 
var dest = ss.getSheetByName(newname); // get new sheet
  var rang = dest.getRange(2,2,lastRow,lastCol); // get destination range
   tableRange.copyTo(rang,  {contentsOnly: true}); // copy table
    var ttt = ss.getRange('TableFullTitle').getValue();
 dest.getRange('B1').setValue(ttt);
   rang.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY); //FORMAT TABLE
  rang.setBorder(true, true, true, true, true, true); // setBorder(top, left, bottom, right, vertical, horizontal)
     
  sheetnames.insertRowBefore(1); // insert new row in sheet names sheet
  sheetnames.getRange('A1').setValue(newname); // copy sheet name into list
      
  }
  // END LOOP
  tablesheet.activate();
  
   
} /////////////////////////////////// BulkIndividualz() ///////////////////////////////////////////////////////////////// END


function DeleteNewSheetz() { //Deletes Batch created sheets as listed in the LIST OF SHEET NAMES sheet ////////////////// DeleteNewSheetz()  ///////////////
  var ss = SpreadsheetApp.getActive();
  var deletsheet = ss.getSheetByName('List of Sheet Names');
  var killist = deletsheet.getDataRange().getValues();//get name values as 'namelist'
  
//LOOP
  for(i in killist){ //for each in the namelist
   // set variables
 var curr = ss.getSheetByName(killist[i]);
    
    ss.deleteSheet(curr);
      
  }
  // END LOOP  
deletsheet.getDataRange().clear();
  
}///////////////////////////////     DeleteNewSheetz()     ///////////////////////////////////////////////////////////////END

function normaliseandFourGrade(){///////////////////////////////////////////////normaliseandFourGrade()
  var val = getSelectedValues();// getSelectedValues() /////  Gets values from active Range in sheet
  
  
  var norm = normalise(val); // normalise(Array) // normalises a given range of numerical values
  
  
  toNewColumn(norm,"Simple Grade");// toNewColumn(Array,'Title') // inserts data to column inserted before active range (Title is optional)
}////////////////////////////////////////////////normaliseandFourGrade(){

function NormaliseSelectedScores(){//////////////////////////////////////////////Normalise Selected Scores NON STANDARDISED
var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
var sh = ss.getActiveSheet();// get sheet
var range = sh.getActiveRange();//get active range
var val = range.getValues();//get values
var numval = val.length; // number of values
  var numsamp = numval-1;// number to use for st.dev
var total = val.reduce(myFunc); //total of values
var average = total/numval; // average of values
function myFunc(total, num) {
  return (1*total) + (1*num);
}
var diffs = val.map(function(value){
var diff = Math.pow(((value) - average), 2);
  return diff;
});
var diffstot = diffs.reduce(myFunctwo);// St.Dev Pop -1
 function myFunctwo(totalz, numz) {
  return totalz + numz;
}
var stDev = Math.sqrt(diffstot / numsamp);
var Normed = val.map(function(valuee){
  var norm = []
  norm.push(Math.round((((1*valuee - average)/stDev)*15)+100));
  return norm;
});
//Logger.log(average);
//Logger.log(stDev);
//Logger.log(numval);
//Logger.log(numsamp);
//Logger.log(diffs);
//Logger.log(diffstot);
sh.insertColumnBefore(range.getColumn());//insert column
 var writerange = sh.getRange(range.getRow(),range.getColumn(),numval,1);  //select range val.length
 writerange.setValues(Normed); //set values
  if (range.getRow()>1){
  sh.getRange(range.getRow()-1,range.getColumn()).setValue('Normalised Scores');
  }//end if (range.getRow()>1) END

}/////////////////////////////////////////////////Normalise Scores

function SelectedStanineGrades(){//////////////////////////////////////////////StandardGradesNine Verbal Stanine Grades  NON STANDARDISED
  var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
  var sh = ss.getActiveSheet();// get sheet
  var range = sh.getActiveRange();//get active range
  var val = range.getValues();//get values
  var num = val.length; // number of values
  var Stanine = [];//stanine array
  var stanines = [];
  for (i in val){
    if (val[i] >=126.25){
    Stanine.push('Very High');// push grade
    }else if (val[i] >=118.75){
    Stanine.push('High');// push grade
    }else if (val[i] >=111.25){
    Stanine.push('Above Average');// push grade
      }else if (val[i] >=103.75){
    Stanine.push('High Average');// push grade
    }else if (val[i] >=96.25){
    Stanine.push('Average');// push grade
    }else if (val[i] >=88.75){
    Stanine.push('Low Average');// push grade
    }else if (val[i] >=81.25){
    Stanine.push('Below Average');// push grade
    }else if (val[i] >=73.75){
    Stanine.push('Low');// push grade
    }else {
    Stanine.push('Very Low');// push grade
        }//END if if (val[i] >126.25) END
  }//END for (i in val){ END
  Logger.log(val);
  Logger.log(Stanine);
var stanines = SliceArray(Stanine);
   Logger.log(stanines);
  //Write data
  sh.insertColumnBefore(range.getColumn());//insert column
var writerange = sh.getRange(range.getRow(),range.getColumn(),num,1);  //select range val.length
 writerange.setValues(stanines); //set values
  if (range.getRow()>1){
  sh.getRange(range.getRow()-1,range.getColumn()).setValue('Verbal Grade');
  }//end if (range.getRow()>1) END
  
}/////////////////////////////////////////////////StandardGradesNine

function SelectedStanineNumerical(){//////////////////////////////////////////////StandardGradesNine Verbal Stanine Grades  NON STANDARDISED
   var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
  var sh = ss.getActiveSheet();// get sheet
  var range = sh.getActiveRange();//get active range
  var val = range.getValues();//get values
  var num = val.length; // number of values
  var Stanine = [];//stanine array
  var stanines = [];
  for (i in val){
    if (val[i] >=126.25){
    Stanine.push('9');// push grade
    }else if (val[i] >=118.75){
    Stanine.push('8');// push grade
    }else if (val[i] >=111.25){
    Stanine.push('7');// push grade
      }else if (val[i] >=103.75){
    Stanine.push('6');// push grade
    }else if (val[i] >=96.25){
    Stanine.push('5');// push grade
    }else if (val[i] >=88.75){
    Stanine.push('4');// push grade
    }else if (val[i] >=81.25){
    Stanine.push('3');// push grade
    }else if (val[i] >=73.75){
    Stanine.push('2');// push grade
    }else {
    Stanine.push('1');// push grade
        }//END if if (val[i] >126.25) END
  }//END for (i in val){ END
  Logger.log(val);
  Logger.log(Stanine);
var stanines = SliceArray(Stanine);
   Logger.log(stanines);
  //Write data
  sh.insertColumnBefore(range.getColumn());//insert column
var writerange = sh.getRange(range.getRow(),range.getColumn(),num,1);  //select range val.length
 writerange.setValues(stanines); //set values
  if (range.getRow()>1){
  sh.getRange(range.getRow()-1,range.getColumn()).setValue('Numerical Grade');
  }//end if (range.getRow()>1) END
}/////////////////////////////////////////////////SelectedStanineNumerical

function SelectedToFourGrades(){//////////////////////////////////////////////StanineTo4Grades Verbal Stanine Grades
  var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
  var sh = ss.getActiveSheet();// get sheet
  var range = sh.getActiveRange();//get active range
  var val = range.getValues();//get values
  var num = val.length; // number of values
  var Stanine = [];//stanine array
  
  for (i in val){
    if (val[i] >=118.75){
    Stanine.push('High');// push grade
    }else if (val[i] >=111.25){
    Stanine.push('Above Average');// push grade
    }else if (val[i] >=88.75){
    Stanine.push('Average');// push grade
    }else {
    Stanine.push('Below Average');// push grade
    }//END if if (val[i] >126.25) END
  }//END for (i in val){ END
  Logger.log(val);
  Logger.log(Stanine);
 // for (i in Stanine){
  //  var gg = 1*i + 1;
 // stanines.push(Stanine.slice(i,gg));
    
  var stanines = SliceArray(Stanine); 
  //}//END for i in stanine
   Logger.log(stanines);
  //Write data
  sh.insertColumnBefore(range.getColumn());//insert column
var writerange = sh.getRange(range.getRow(),range.getColumn(),num,1);  //select range val.length
 writerange.setValues(stanines); //set values
  if (range.getRow()>1){
  sh.getRange(range.getRow()-1,range.getColumn()).setValue('Simple Grade');
  }//end if (range.getRow()>1) END
}/////////////////////////////////////////////////StanineTo4Grades


function NSStoPIPS(){//////////////////////////////////////////////NSStoPIPS
  var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
  var sh = ss.getActiveSheet();// get sheet
  var range = sh.getActiveRange();//get active range
  var val = range.getValues();//get values
  var num = val.length; // number of values
  var pips = [] // pips style
  
  for (i in val){
  pips.push(parseInt((((((1*val[i])-100)/15)*10)+50)));
  }//for (i in val){END///
 // Logger.log(pips);
  var sliced = SliceArray(pips); 
  //Logger.log(sliced);
   //Write data
  sh.insertColumnBefore(range.getColumn());//insert column
var writerange = sh.getRange(range.getRow(),range.getColumn(),num,1);  //select range val.length
 writerange.setValues(sliced); //set values
  if (range.getRow()>1){
  sh.getRange(range.getRow()-1,range.getColumn()).setValue('T-Scores');
  }//end if (range.getRow()>1) END
}/////////////////////////////////////////////////NSStoPIPS

function PIPStoNSS(){//////////////////////////////////////////////PIPStoNSS 
  var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
  var sh = ss.getActiveSheet();// get sheet
  var range = sh.getActiveRange();//get active range
  var val = range.getValues();//get values
  var num = val.length; // number of values
  var nss = [] // nss style
  
  for (i in val){
  nss.push(parseInt((((((1*val[i])-50)/10)*15)+100)));
  }//for (i in val){END///
 // Logger.log(nss);
  var sliced = SliceArray(nss); 
  //Logger.log(sliced);
   //Write data
  sh.insertColumnBefore(range.getColumn());//insert column
var writerange = sh.getRange(range.getRow(),range.getColumn(),num,1);  //select range val.length
 writerange.setValues(sliced); //set values
  if (range.getRow()>1){
  sh.getRange(range.getRow()-1,range.getColumn()).setValue('S-Scores');
  }//end if (range.getRow()>1) END
}/////////////////////////////////////////////////PIPStoNSS

function NSStoZScores(){//////////////////////////////////////////////StanineTo4Grades Verbal Stanine Grades
  var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
  var sh = ss.getActiveSheet();// get sheet
  var range = sh.getActiveRange();//get active range
  var val = range.getValues();//get values
  var num = val.length; // number of values
  var zscores = [] // pips style
  
  for (i in val){
  zscores.push(((((((1*val[i])-100)/15)))));
  }//for (i in val){END///
 // Logger.log(pips);
  var sliced = SliceArray(zscores); 
  //Logger.log(sliced);
   //Write data
  sh.insertColumnBefore(range.getColumn());//insert column
var writerange = sh.getRange(range.getRow(),range.getColumn(),num,1);  //select range val.length
 writerange.setValues(sliced); //set values
  if (range.getRow()>1){
  sh.getRange(range.getRow()-1,range.getColumn()).setValue('Z-Scores');
  }//end if (range.getRow()>1) END
}/////////////////////////////////////////////////StanineTo4Grades
 

function SliceArray(e){//////////////////////function SliceArray(e){
  var sliced = []
  for (i in e){
    var gg = 1*i + 1;
  sliced.push(e.slice(i,gg));
   
  }//END for i in e
  return sliced;
}/////////////////////////////////END slice Array ////////////////////////////////////////////////////////////////

function replaceValues(searchVal,newVal,targetArray){////////////////////////////////// replaceValues() ///////////////////////////////////////////////
  //replaceValues(searchVal,newVal,targetArray)// Takes in three arrays:searchVal,newVal,targetArray
  // 1. Original values to search for
  // 2. New Values to replace them with
  // 3. Target array to replace values in
  // loop through target array
  // Loop through search values
  // replace or pass values as needed
  
 // var searchVal = ['funky','wonky'];
 // var newVal = ['Blunky','donkey'];
 // var targetArray = ['funky','wonkey','Bonkey','wonky'];
  var inVals = [];
   
for (j in targetArray){//for (j in targetArray)
  // loop through array
Logger.log(targetArray[j]);
    var match = 0;// reset counter
     
  for (i in searchVal){//for (i in searchVal)
          var sv =  searchVal[i];
          var nv = newVal[i];
          if (targetArray[j] == searchVal[i]){// if search value found
           inVals.push(newVal[i]); // push new value to array
            match = 1 // set counter to say value pushed already
          }//END if (targetArray[j] == searchVal[i])
          
          }//for (i in searchVal)END
  if (match == 0){//if match not found
    
    inVals.push(targetArray[j]);// pass original value
  } // END if (match = 0)
}//for (j in targetArray)END
    
  
  
  Logger.log(inVals);
  
}////////////////////////////////// replaceValues() ///////////////////////////////////////////////



function SplitSelectedNames() { ////////////////////////////////////////////////   SplitSelectedNames()  ///////////////////////////////////////////////////////////////////////////////
  //Splits full name into full name, Surname and First name, removing middle names (any other non-hyphenated names)
  var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
  var sh = ss.getActiveSheet();// get sheet
  var range = sh.getActiveRange();//get active range
  var val = range.getValues();//get values
  var array = [];//create 2D array
  var first = "";
  var last = "";
   var all = "";
  
  for (i in val){
    var spaces = val[i].toString().replace(new RegExp('[^ ]', 'g'), "").length; // deletes letters and gets number of spaces between
    var name = val[i];

    for (n=1; n<spaces+1; n++){// loop to number spaces
  
    //  Logger.log(val[i].toString().indexOf(' '));
   name =  name.toString().replace(" ", n);
 // Logger.log(name.toString().replace(" ", n));  
     
   }
  // Logger.log(n);// max number of spaces
 first = name.slice(0,name.indexOf("1"));
 last = name.slice(name.indexOf(spaces.toString())+1,name.length)
  
 all = [first,last,first +" "+last]// put all names in array
  array.push(all);// add array to end of matrix array
  }//for (i in val) END LOOP
 
  // Logger.log(array);
 sh.insertColumns(1, 3);//insert columns
 var writerange = sh.getRange(range.getRow(),1,val.length,3);  //select range val.length
 writerange.setValues(array); //set values
 
}////////////////////////////////////////////////   SplitSelectedNames()  ///////////////////////////////////////////////////////////////////////////////

function transposeArray(a) {////////////////////////////////////////////////   transposeArray(a)  ///////////////////////////////////////////////////////////////////////////////
//array = transposeArray(array);
// use when you have a number of column arrays to stick together
  return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
  // or in more modern dialect
  //return a[0].map((_, c) => a.map(r => r[c]));
}////////////////////////////////////////////////   transposeArray(a)  ///////////////////////////////////////////////////////////////////////////////



//Old SCriptssss


function getNote(cell) {
  //Runs as formula in a cell with inverted commas around cell reference e.g.: getNote("A1")
  // OR USE ADDRESS(ROW(),COLUMN())
  //Does not refresh when note changes!!!
//move the cell with the formula in it to refresh
    return SpreadsheetApp.getActiveSheet().getRange(cell).getComment();
}

function gdcellformula(cell) {
  //Runs as formula in a cell with inverted commas around cell reference e.g.: getNote("A1")
  // OR USE ADDRESS(ROW(),COLUMN())
  //Does not refresh when note changes!!!

    return SpreadsheetApp.getActiveSheet().getRange(cell).getFormula();
}

function cellformula(reference) {// not very good formula from the forums
  var ss = SpreadsheetApp;
  var sheet = ss.getActiveSheet();
  var formula = ss.getActiveRange().getFormula();
  var args = formula.match(/=\w+\((.*)\)/i);
  try {
    var range = sheet.getRange(args[1]);
  }
  catch(e) {
    throw new Error(args[1] + ' is not a valid range');
  }
  return range.getFormula();
}

function sheetnames() { 
  var out = new Array() //creates array
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets(); // gets sheets
  for (var i=0 ; i<sheets.length ; i++) out.push( [ sheets[i].getName() ] ) // gets names of sheets in turn
  return out  // outputs array
}


function Notes() {
var ss = SpreadsheetApp.getActiveSpreadsheet(); //Gets spreadsheet
var sheet = ss.getSheets()[0];//gets first sheet
var cell = sheet.getRange('A1');   //gets cell A1
if (cell.getValue()=='Yes'){ // checks if value is YES
var s = SpreadsheetApp.getActiveSheet(); //gets sheet
if( s.getName() == "Reading Record" ) { //checks that we're on the correct sheet
var r = s.getActiveCell(); // gets cell
  
   //ADD IF UNSATISFACTORY/DEVELOPING/GOOD/VERY GOOD ASK WHY AND ADD RESPONSE AS NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!AAAAAAAAARRRRGGGGGGHHHHHH!!!!!!!!
//if( r.getRow() == 1 ) { //checks the row is the title row (1)
var t = new Date(); //Gets full date

if (r.isBlank()) { // checks if cell is blank
r.clearNote(); // deletes note
} else {
if (Browser.msgBox('Do you wish to add the date as a note in this cell?', Browser.Buttons.YES_NO) == 'yes') {
r.setNote(t.getDate()+"/"+ (t.getMonth()+1)+"/"+ t.getFullYear()); // Sets Date as note
}
}
}
}
}


function onEdit() {

// Notes();

//TickBox();
  
}

function TickBox() {
var ss = SpreadsheetApp.getActiveSpreadsheet(); //Gets spreadsheet
var sheet = ss.getSheetByName('Mark Sheet New Style');//gets sheet
var current = sheet.getActiveCell(); // gets cell
var range = sheet.getRange('D1:R1') // gets range
var currentVal = current.getValue();  
var intersect =  RangeIntersect(current, range); 

  if (intersect =='true'){ // checks if value is True
  
if (cell.getValue()=='True'){ // checks if value is True
range.hideColumns();
current.showColumn();
}
if (cell.getValue()=='False'){ // checks if value is False
range.showColumns();

}
}
}
function RangeIntersect(R1, R2) {

  var LR1 = R1.getLastRow();
  var Ro2 = R2.getRow();
  if (LR1 < Ro2) return false;


  var LR2 = R2.getLastRow();
  var Ro1 = R1.getRow();
  if (LR2 < Ro1) return false;

  var LC1 = R1.getLastColumn();
  var C2 = R2.getColumn();
  if (LC1 < C2) return false;

  var LC2 = R2.getLastColumn();
  var C1 = R1.getColumn();
  if (LC2 < C1) return false;

  return true;

}

function ExportData(){////////////////////////////////////////////////ExportData
  //Exports data from raw data sheet (this one) to assessment data processor sheet
  // Get data from Active sheet in this Spreadsheet
var ss = SpreadsheetApp.getActive();// Get Active Spreadsheet
var sh = ss.getSheetByName('Assessment Data Query');// Get Assessment Data Query sheet
var lr = sh.getLastRow();//get last row number  
var lc = sh.getLastColumn(); // get last column number
var range = sh.getDataRange();// get data range
var values = range.getValues();// get values to copy
  
//open target sheet 
  var ssb = SpreadsheetApp.openById('1kJavNgykrWWagv_-_CcG8F2W8Kr6kys2CDkY5qDHN6w');//open target Assessment Database Thorpe House Spreadsheet
  var shb = ssb.getSheetByName('AssessmentData');// get data sheet b
  var lrb = shb.getLastRow();//get last row b
  var rangeb = shb.getDataRange();// get data range B
  rangeb.clear();
  //shb.insertRowAfter(lrb);//insert a row
  var tr = shb.getRange(1,1,lr,lc);//get target range TR
  tr.setValues(values);// copy values across
  
  
}////////////////////////////////////////////////ExportData


function DeleteRowMatching(){// Deleting Rows Based on Cell Values
// select the value you want to delete and it will delete each row that contains it
var ss = SpreadsheetApp.getActive();// Get Active Spreadsheet
var sheet = ss.getActiveSheet();// Get Active sheet
var range = sheet.getDataRange();// Get Full Data range
var e = sheet.getActiveCell();// get active cell

var DELETE_VAL = e.getValue() ;// get value of e
var COL_TO_SEARCH = e.getColumn()-1 ; //Get Column of e (base 0)
  
Logger.log(COL_TO_SEARCH);

  
  var rangeVals = range.getValues();
  
  var newrangeVals = [];

  for(var i = 0; i < rangeVals.length; i++){
    if(rangeVals[i][COL_TO_SEARCH] != DELETE_VAL){
      
      newrangeVals.push(rangeVals[i]);
    };
  };
  
  range.clearContent();
  
  var newrange = sheet.getRange(1,1,newrangeVals.length, newrangeVals[0].length);
  newrange.setValues(newrangeVals);
}//////////////////////////////////////// DeleteRowMatching /////////////////////////////////////////////////

function removeDuplicates() { //removes duplicates in active sheet
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
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
}  

function chartz(){
var sheet = SpreadsheetApp.getActiveSpreadsheet();
var Chart = sheet.getSheetByName('Chart Rating').copyTo(sheet);
Chart.setName('New Chart'); 
 
}

function copyDataValidation() {
   var cellone = SpreadsheetApp.getActive().getRange('Q1'); //get source 
   var celltwo = SpreadsheetApp.getActive().getRange('Q2'); // get target
 var rule = cellone.getDataValidation(); //get source Data Validation
   celltwo.setDataValidation(rule); // copy source data validation to target
}

function buildQuery() {
// THIS FUNCTION COPIES A QUERY FROM A CELL THEN FLUSHES THE UI BEFORE FLATTENING THE QUERY AND SETTING FORMATTING (BY COPYING IT FROM ANOTHER EXAMPLE CELL)
  
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();

  
var cellone = sheet.getRange('A13').getValue(); //get source
var c2add = sheet.getRange('X21').getValue(); // cell two (query) address
var celltwo  = sheet.getRange(c2add); //get target
var rangeadd = sheet.getRange('W16').getValue(); // range 1 address
var range = sheet.getRange(rangeadd); //get range for table flatten
var rangetwoadd = sheet.getRange('X12').getValue(); // range 2 address
var rangetwo = sheet.getRange(rangetwoadd); //get range for clear header row
range.clear(); // clear the range
rangetwo.clearFormat();
celltwo.setValue('='+cellone); // Copy query formula from A13 to Z14 in active sheet So Null is off page (adds '=' sign to activate)
SpreadsheetApp.flush();
 
var tableadd = sheet.getRange('X16').getValue(); // get table body address to flatten
var table = sheet.getRange(tableadd); // get table body to flatten

table.copyTo(table);// flatten range
  //range.copyTo(range, {contentsOnly: true});// flatten range
celltwo.clear(); //delete query

 formatTable();
  
   dobFormat();
  dotFormat();

  
}
  function dobFormat() {
 var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();   
var dobadd = sheet.getRange('X14').getValue(); //Get address of column of DOB if it exists
var dob = sheet.getRange(dobadd); // get range of column  
dob.setNumberFormat('dd/MM/yyyy');  // set date format
}
function dotFormat() {
 var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();   
var dotadd = sheet.getRange('X19').getValue(); //Get address of column of DOt if it exists
var dot = sheet.getRange(dotadd); // get range of column  
dot.setNumberFormat('dd/MM/yyyy');  // set date format
}

  function formatTable(){   
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();
  // copy formatting for body of table
var bodyformat = sheet.getRange('X2');
var tableadd = sheet.getRange('X10').getValue(); // get table body address
var table = sheet.getRange(tableadd); // get table body 
  
bodyformat.copyTo(table, {formatOnly: true}); //copy formatting for body of table 
     table.setBorder(true, true, true, true, false,true,'#DCDCDC',null);
    

  //COPY FORMATTING OF HEADER ROW
 var headformat = sheet.getRange('X1');
var headadd = sheet.getRange('X12').getValue(); // get head body address
var head = sheet.getRange(headadd); // get head body
 var headrowadd = sheet.getRange('W12').getValue(); // get head row address 
 var headrow = sheet.getRange(headrowadd); // get headrow
  headrow.setBorder(false, false, false, false, false,false,'#DCDCDC',null);   
   
headformat.copyTo(head, {formatOnly: true}); //copy formatting for body of head  
    head.setBorder(true, true, true, true, false,true,'#DCDCDC',null);
  }
function clearNamedRanges(){
// The code below deletes all the named ranges in the spreadsheet.
var namedRanges = SpreadsheetApp.getActive().getNamedRanges();
for (var i = 0; i < namedRanges.length; i++) {
  namedRanges[i].remove();
}
 
} ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CreateNRSheet(){ //Create NRSheet a named range sheet to list all sheets in the SpreadSheet and assign named ranges to them
  
var ss = SpreadsheetApp.getActiveSpreadsheet(); // GET SPREADSHEET
  
  var NRSheet = ss.getSheetByName("Named Ranges Helper"); //GET 'NAMED RANGES' SHEET

    if (NRSheet) {
ss.deleteSheet(NRSheet);
 }

ss.insertSheet().setName("Named Ranges Helper"); // Create NRSheet
  
  
  
var NRSheet = ss.getSheetByName("Named Ranges Helper"); //GET 'NAMED RANGES' SHEET
 NRSheet.activate();
  ss.moveActiveSheet(0);
//  ui.flush;
  var sheets = ss.getSheets(); //GET All SHEET NAMES
// Set Labels
NRSheet.getRange(1,1).setValue('SHEET NAMES'); //sET LAbel
NRSheet.getRange(1,2).setValue('NAME OF RANGE'); // sET LAbel 
NRSheet.getRange(1,3).setValue('FULL RANGE INCLUDING SHEET NAME'); //sET LAbel
NRSheet.getRange(1,4).setValue('NO. OF COLUMNS'); //sET LAbel
NRSheet.getRange(1,5).setValue('NO. OF ROWS'); //sET LAbel
NRSheet.getRange(1,6).setValue('HEADER ROW'); //sET LAbel
NRSheet.getRange(1,7).setValue('HEADER NAMED RANGE'); //sET LAbel
NRSheet.getRange(1,8).setValue('TABLE NAMED RANGE'); //sET LAbel
  
// Sheets Loop !!! Loops through all sheets in spreadsheet 
// Gets ranges etc to fill in named range sheet and create named ranges
  
 
  for(var i =0;i<sheets.length;i++){//loop for each sheet
    
    //GET NAME AND MAKE NAMED RANGE NAME FOR WHOLE SHEET
    var CurName = sheets[i].getName(); // GET NAME OF SHEET
    
    if (CurName=="Named Ranges Helper"){
      Logger.log(CurName);
       NRSheet.getRange(i+2,1).setValue(CurName); //sET Sheet Name 
    }else{
    
    var CurNoSpace = CurName.replace(/\s/g, "_") //Delete Spaces in Sheet name
    var CurSheet = ss.getSheetByName(CurName); // GET CURRENT SHEET by name
    var table = CurNoSpace + 'Table'
    var header = CurNoSpace + 'Header'
    
    //GET DATA RANGE FOR ENTIRE SHEET
    var DataRange = CurSheet.getDataRange(); // GET DATA RANGE FOR ENTIRE SHEET
    var firstCell = CurSheet.getRange(FindFirstDataCell(CurName)); // get first cell
    var NumCol = DataRange.getNumColumns(); //GET NUMBER OF COLUMNS
    var NumRows = DataRange.getNumRows(); //GET NUMBER OF ROWS
    var StartRow = firstCell.getRow(); // GET START ROW
    var StartCol = firstCell.getColumn(); // GET START COLUMN
    //var StartRow = DataRange.getRow(); // GET START ROW
   // var StartCol = DataRange.getColumn(); // GET START COLUMN
    
    
    NRSheet.getRange(i+2,1).setValue(CurName); //sET Sheet Name 
    
    if (NumCol + NumRows > 2) {
    
    // WRITE TO CELLS
   
    NRSheet.getRange(i+2,2).setValue(CurNoSpace); // sET Range name 
    
    NRSheet.getRange(i+2,4).setValue(NumCol); //sET NO. OF COLUMNS
    NRSheet.getRange(i+2,5).setValue(NumRows); //sET NO. OF ROWS
    NRSheet.getRange(i+2,6).setValue(StartRow); //sET HEADER ROW
    
    NRSheet.getRange(i+2,7).setValue(header); //sET HEADER NAMED RANGE
    NRSheet.getRange(i+2,8).setValue(table); //sET TABLE NAMED RANGE
        
    // CREATE NAMED RANGE FOR FULL SHEET
    var CurRange = CurSheet.getRange(StartRow,StartCol,NumRows,NumCol); //GET RANGE
    var CurA1 = CurRange.getA1Notation(); //GET A1 NOTATION OF RANGE
    var CurFullName = "''" + CurName + "'!" + CurA1; //GET FULL ADDRESS OF RANGE (TO PUT IN CELL)
    ss.setNamedRange(CurNoSpace, CurRange); // SET UP NAMED RANGE
    
    // WRITE TO CELLS
    NRSheet.getRange(i+2,3).setValue(CurFullName); //sET FULL RANGE INCLUDING SHEET NAME
    
   
    // CREATE NAMED RANGE FOR HEADER
    var CurRange = CurSheet.getRange(StartRow,StartCol,1,NumCol); //GET RANGE
    var CurA1 = CurRange.getA1Notation(); //GET A1 NOTATION OF RANGE
  
    ss.setNamedRange(header, CurRange); // SET UP NAMED RANGE
    
    // CREATE NAMED RANGE FOR TABLE
    var CurRange = CurSheet.getRange(StartRow+1,StartCol,NumRows-1,NumCol); //GET RANGE !!!! invalid range on blank sheets
    var CurA1 = CurRange.getA1Notation(); //GET A1 NOTATION OF RANGE

    ss.setNamedRange(table, CurRange); // SET UP NAMED RANGE

    }//end if numcol +numrows >2
     }// end if named range helper
      
    }// end loop
    


  // Wrap Text
var range =  NRSheet.getDataRange();//get data range
range.setWrap(true); // wrap text
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}










function rangeNamer(){
  
  //1 get all the sheet names and used ranges
  
  //2 Write all the names in the Named Ranges Sheet Column A ROW 2 WITHOUT SPACES
  
  //3 Write all the used ranges in column B ROW 2 of the Named ranges sheet WITHOUT SPACES
  
  //4 create named ranges to match each sheet name and range
  
 var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets(); //GET SHEET NAMES
var ss = SpreadsheetApp.getActiveSpreadsheet(); // GET SPREADSHEET
  var NRSheet = ss.getSheetByName("Named Ranges Helper"); //GET 'NAMED RANGES' SHEET

    if (!NRSheet) {
CreateNRSheet();
 }
  
  
  var NumCol = NRSheet.getRange("a2").getValue(); //GET NUMBER OF COLUMNS FOR ALL SHEETS
  var StartRow = NRSheet.getRange("b2").getValue(); // GET START ROW FOR ALL SHEETS
 
  for(var i =0;i<sheets.length;i++){//loop for each sheet
    var CurName = sheets[i].getName(); // GET NAME OF SHEET
    var CurNoSpace = CurName.replace(/\s/g, "") //Delete Spaces in Sheet name
    var  CurSheet = ss.getSheetByName(CurName); // GET CURRENT SHEET by name
    var CurRange = CurSheet.getRange(StartRow,1,CurSheet.getMaxRows()-StartRow+1,NumCol); //Get Active rows for certain number of columns
    var CurA1 = CurRange.getA1Notation(); //Get A1 Notation of current range
    var CurFullName = "''" + CurName + "'!" + CurA1;
     ss.setNamedRange(CurNoSpace, CurRange); // set up named range for current
    
   NRSheet.getRange(i+4,1).setValue(CurName); //SET NAME OF SHEETS IN NAMED RANGE SHEET
    NRSheet.getRange(i+4,2).setValue(CurNoSpace); //SET NAME OF RANGES IN NAMED RANGE SHEET
   NRSheet.getRange(i+4,3).setValue(CurFullName); //SET ADDRESS WITH NAME OF RANGES IN NAMED RANGE SHEET
   NRSheet.getRange(i+4,4).setValue(CurA1); //SET ADDRESS WITHOUT SHEET NAME OF RANGES IN NAMED RANGE SHEET
    }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

function rangeUpdater(){
  
  //1 get all the sheets
  
  //2 For each sheet, check desired range 
  
  //3 Update each named range  or delete if absent
  
    
 var sheets=SpreadsheetApp.getActiveSpreadsheet().getSheets(); //GET SHEET NAMES
var ss = SpreadsheetApp.getActiveSpreadsheet(); // GET SPREADSHEET
  var NRSheet = ss.getSheetByName("Named Ranges Helper"); //GET 'NAMED RANGES' SHEET
 
  for(var i =0;i<sheets.length;i++){
    var CurName = sheets[i].getName(); // GET NAME OF SHEET
    var CurNoSpace = CurName.replace(/\s/g, ""); //Delete Spaces in Sheet name
    var  CurSheet = ss.getSheetByName(CurName); // GET CURRENT SHEET
    var CurA1 = NRSheet.getRange(i+4,4).getValue(); //Get A1 Notation FROM CELL
    var blank =  NRSheet.getRange(i+4,4).isBlank(); // RANGE IS BLANK
    var blankTwo =  NRSheet.getRange(i+4,2).isBlank(); // NAMEDRANGE NAME IS BLANK
  
    
    if (blank == 1) { //IF range is blank then delete named range
       NRSheet.getRange(i+4,3).clear() //SET RANGES IN NAMED RANGE SHEET
    var CurFullName = "''" + CurName + "'!"   // put together range and sheet name
    if (blankTwo != 1) { //IF range is blank then delete named range
          ss.removeNamedRange(CurNoSpace)
           NRSheet.getRange(i+4,2).clear() //SET NAME OF RANGES IN NAMED RANGE SHEET   
    }
    } else if (blank == 0) { 
        var CurRange = CurSheet.getRange(CurA1) // Get Current Range from Cell value
    var CurFullName = "''" + CurName + "'!" + CurA1  // put together range and sheet name
    NRSheet.getRange(i+4,2).setValue(CurNoSpace) //SET NAME OF RANGES IN NAMED RANGE SHEET
      ss.setNamedRange(CurNoSpace, CurRange) // set up named range for current
      NRSheet.getRange(i+4,3).setValue(CurFullName); //SET ADDRESS WITH NAME OF RANGES IN NAMED RANGE SHEET
        }
   
    
   NRSheet.getRange(i+4,1).setValue(CurName); //SET NAME OF SHEETS IN NAMED RANGE SHEET
    
   
  
    }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}




function AnswerSelectedQs() { ////////////////////////////////////////////////   AnswerSelectedQs()  ///////////////////////////////////////////////////////////////////////////////
  //Splits full name into full name, Surname and First name, removing middle names (any other non-hyphenated names)
  var ss =   SpreadsheetApp.getActive();//Get Spreadsheet
  var sh = ss.getActiveSheet();// get sheet
  var range = sh.getActiveRange();//get active range
  var val = range.getValues();//get values
  var Array = [];//create 2D array
  var first = "";
  var last = "";
   var all = "";
  
  for (i in val){
    
    var name = val[i].toString();

    if (name.indexOf('x')>-1){
    //////
      var qu = separateQuestionNumber(name);// Sort out Question Number
      if (qu.length>0){
        qu = qu +') ';
      }else{
        qu = '';
      } // Sort out Question Number
      
      //Push answer to array
    //  Logger.log(qu +solveMultiplication(separateNumberSentence(name)));
      Array.push(qu +solveMultiplication(separateNumberSentence(name)));
    //////
      
    } else if (name.indexOf('÷')>-1){
        
      var qu = separateQuestionNumber(name);// Sort out Question Number
      if (qu.length>0){
        qu = qu +') ';
      }else{
        qu = '';
      } // Sort out Question Number 
      
      //Push answer to array
       //Logger.log(qu +solveDivision(separateNumberSentence(name)));
      Array.push(qu +solveDivision(separateNumberSentence(name)));
      
    } else if (name.indexOf('-')>-1){
          //////
      var qu = separateQuestionNumber(name);// Sort out Question Number
      if (qu.length>0){
        qu = qu +') ';
      }else{
        qu = '';
      } // Sort out Question Number
      
      //Push answer to array
    //  Logger.log(qu +solveMultiplication(separateNumberSentence(name)));
      Array.push(qu +solveSubtraction(separateNumberSentence(name)));
    ////// 
  
    
    
    }else if (name.indexOf('+')>-1){
      //////
      var qu = separateQuestionNumber(name);// Sort out Question Number
      if (qu.length>0){
        qu = qu +') ';
      }else{
        qu = '';
      } // Sort out Question Number
      
      //Push answer to array
    //  Logger.log(qu +solveMultiplication(separateNumberSentence(name)));
      Array.push(qu +solveAddition(separateNumberSentence(name)));
    //////
    } else if (name.indexOf('of')>-1){
      //////
      //Logger.log(name.indexOf('of')+ "index of of");
      var qu = separateQuestionNumber(name);// Sort out Question Number
      if (qu.length>0){
        qu = qu +') ';
      }else{
        qu = '';
      } // Sort out Question Number
      
      //Push answer to array
    //  Logger.log(qu +solveMultiplication(separateNumberSentence(name)));
      Array.push(qu +solveFraction(separateNumberSentence(name)));
    //////
    }else {
      Array.push('');// push empty space into array
    }

  }//for (i in val) END LOOP
  // Logger.log(Array);
  Array =  SliceArray(Array);
   // Logger.log(Array);
  
  toNewColumn(Array,'Answers');

 
}////////////////////////////////////////////////   AnswerSelectedQs()  ///////////////////////////////////////////////////////////////////////////////


  
function separateQuestionNumber(Question){ //////////////////////////////////////  separateQuestionNumber(Question)
  
Question = Question.toString().replace(/ /g,'').replace(/_/g,''); // deletes spaces, equals and underscores
 // Question = Question.toString();
 // Logger.log(Question);
  var bracket = Question.indexOf(")");
  var fullstop = Question.indexOf(".");
  
// Logger.log('Question.indexOf())= '+bracket);
//  Logger.log('Question.indexOf(.)= '+fullstop);
  if (bracket>-1){
 //   Logger.log(') = TRUE');
  return Question.slice(0,bracket);
    
       }else if (fullstop>-1){
     //    Logger.log('. = TRUE');
        return Question.slice(0,fullstop);
      }else{
        return "";
     //   Logger.log('No Q No.');
        
      }//END if
} //////////////////////////////////////  separateQuestionNumber(Question)

function separateNumberSentence(Question){ //////////////////////////////////////  separateQuestionNumber(Question)
Question = Question.toString().replace(/ /g,'').replace(/_/g,''); // deletes spaces and underscores
   var bracket = Question.indexOf(")");
  var fullstop = Question.indexOf(".");
  var len = Question.length;
  if (bracket>-1){
//  Logger.log((Question.indexOf(".")));
  return Question.slice(bracket+1,len );
      }else if (fullstop>-1){
        return Question.slice(fullstop+1,len );
      } else {
        return Question;
      }//END if
} //////////////////////////////////////  separateQuestionNumber(Question)


  function solveMultiplication(Problem){//////////////////////////solveMultiplication(Problem) ///////////////////////////////////////
    
    Problem =  Problem.toString().replace(/ /g,'').replace(/_/g,'').replace(/=/g,''); // deletes spaces, equals and underscores
  var first = Problem.slice(0,Problem.indexOf("x"));
  var second =  Problem.slice(Problem.indexOf("x")+1,Problem.length);
   // Logger.log((second));
    return first + ' x ' + second + ' = ' + (parseInt(first) * parseInt(second));
  } //////////////////////////solveMultiplication(Problem)

  function solveDivision(Problem){//////////////////////////solvesolveDivision(Problem) ///////////////////////////////////////
    
    Problem =  Problem.toString().replace(/ /g,'').replace(/_/g,'').replace(/=/g,''); // deletes spaces, equals and underscores
  var first = Problem.slice(0,Problem.indexOf("÷"));
  var second =  Problem.slice(Problem.indexOf("÷")+1,Problem.length);
   // Logger.log((second));
    return first + ' ÷ ' + second + ' = ' + (parseInt(first) / parseInt(second));
  } //////////////////////////solveDivision(Problem)


function solveAddition(Problem){//////////////////////////solveAddition(Problem) ///////////////////////////////////////
    
    Problem =  Problem.toString().replace(/ /g,'').replace(/_/g,'').replace(/=/g,''); // deletes spaces, equals and underscores
  var first = Problem.slice(0,Problem.indexOf("+"));
  var second =  Problem.slice(Problem.indexOf("+")+1,Problem.length);
   // Logger.log((second));
    return first + ' + ' + second + ' = ' + (parseInt(first) + parseInt(second));
  } //////////////////////////solveAddition(Problem)

function solveSubtraction(Problem){//////////////////////////solveSubtraction(Problem) ///////////////////////////////////////
    
    Problem =  Problem.toString().replace(/ /g,'').replace(/_/g,'').replace(/=/g,''); // deletes spaces, equals and underscores
  var first = Problem.slice(0,Problem.indexOf("-"));
  var second =  Problem.slice(Problem.indexOf("-")+1,Problem.length);
   // Logger.log((second));
    return first + ' - ' + second + ' = ' + (parseInt(first) - parseInt(second));
  } //////////////////////////solveSubtraction(Problem)

function solveFraction(Problem){//////////////////////////solveFraction(Problem) ///////////////////////////////////////
    
    Problem =  Problem.toString().replace(/ /g,'').replace(/_/g,'').replace(/=/g,''); // deletes spaces, equals and underscores
  Logger.log("HELLO Slash ="+Problem.indexOf("/"));
  Logger.log(Problem);
  var slash = Problem.indexOf("/");
  var of = Problem.indexOf("of");
  var len = Problem.length;
  var first = Problem.slice(0,slash);
  var second =  Problem.slice(slash+1,of);
  var third = Problem.slice(of+2,len);
  
 Logger.log('slash' + slash);
 Logger.log('of' +of);
 Logger.log('len' + len);
 Logger.log('first' + first);
 Logger.log('second' +  second);
Logger.log('third' + third);
   // Logger.log((second));
    return first + '/' + second + ' of ' + third + " = " + (parseInt(third) / parseInt(second))*parseInt(first);
  } //////////////////////////solveFraction(Problem)
