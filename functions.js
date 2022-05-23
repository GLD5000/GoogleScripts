function palindromeChecker(args){
  if (Array.isArray(args)) {
      return (args.map( x => x.split("").reverse().join("") === x ? true : false)); // array
  } else if (typeof args === "string") {
      return args.split("").reverse().join("") === args ? true: false;  // string
  } else {
      return `Wrong Data Type: ${typeof args}`; // other type
  }
}


function transposeArray(a) {////////////////////////////////////////////////   transposeArray(a)  ///////////////////////////////////////////////////////////////////////////////
//array = transposeArray(array);
// use when you have a number of column arrays to stick together
  return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
  // or in more modern dialect
  //return a[0].map((_, c) => a.map(r => r[c]));
}////////////////////////////////////////////////   transposeArray(a)  ///////////////////////////////////////////////////////////////////////////////
