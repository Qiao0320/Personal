


function isTwoPassed(){
  var args = Array.prototype.slice.call(arguments);
  return args.indexOf(2) != -1;
}

console.log(isTwoPassed(1,4,3,2));

// console.log(isTowPassed(5,3,1,2))