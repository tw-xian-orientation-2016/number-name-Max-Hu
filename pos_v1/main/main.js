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

function translateStr(splitArr,dictionary){
  var translatedArr = [];
  splitArr.forEach( function(numberStr){
    var thirdBit = getThirdBit(numberStr,dictionary);
    var restBit = getLastTwoBits(numberStr,dictionary);
    var translatedElement = '';
    if (thirdBit && restBit) {
      translatedElement = thirdBit + ' and ' + restBit;
    }

    if (thirdBit && !restBit){
      translatedElement = thirdBit;
    }

    if (!thirdBit && restBit){
      translatedElement = restBit;
    }
    translatedArr.push(translatedElement);
  });
  return translatedArr;
}

function getThirdBit(numberStr,dictionary){
  var thirdBit;
  if (numberStr.length > 2){
    var thirdStr = numberStr.substr(0,1);
    if (thirdStr != '0'){
      thirdBit = dictionary[parseInt(thirdStr)] + ' hundred';
    }
  }
  return thirdBit ;
}

function getLastTwoBits(numberStr,dictionary){
  var lastTwoBits;
  var lastTwoNumber;
  if (numberStr.length < 3){
    lastTwoNumber = numberStr;
  } else {
    if (numberStr.substr(1,1) === "0"){
      lastTwoNumber = parseInt(numberStr.substr(2));
    } else {
      lastTwoNumber = parseInt(numberStr.substr(1,2));
    }
  }


  if (lastTwoNumber){
    lastTwoBits = dictionary[parseInt(lastTwoNumber)];
    if (!lastTwoBits){
      var secondNumber = parseInt(lastTwoNumber.toString().substr(0,1))*10;
      var secondBit = dictionary[secondNumber];
      var firstNumber = parseInt(lastTwoNumber.toString().substr(1));
      var firstBit = dictionary[firstNumber];
      lastTwoBits = secondBit + ' ' + firstBit;
    }
  }
  return lastTwoBits;
}

