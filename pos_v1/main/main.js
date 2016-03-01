function splitInput(inputs){
  var splitArr = [];
  var firstElement = inputs.substr(0, inputs.length%3);

  if (firstElement != ''){
    splitArr.push(firstElement);
  }

  var restArr = inputs.substr(inputs.length%3).match(/.{1,3}/g);
  if (restArr != null) {
    restArr.forEach(function(value){splitArr.push(value)})
  }
  return splitArr;
}
