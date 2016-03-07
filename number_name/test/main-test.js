
describe('Main Task: Spell out a number', function() {

  var inputs;
  var outputs;

  beforeEach(function () {

    inputs = ['5000000', '99', '300', '310', '1501', '12609', '512607', '40112003', '245112043', '5002043'];

    outputs = [
      'five million',
      'ninety nine',
      'three hundred',
      'three hundred and ten',
      'one thousand, five hundred and one',
      'twelve thousand, six hundred and nine',
      'five hundred and twelve thousand, six hundred and seven',
      'forty million, one hundred and twelve thousand and three',
      'two hundred and forty five million, one hundred and twelve thousand and forty three',
      'five million and two thousand and forty three'
    ];

  });

  it('should print correct number in English', function () {
    spyOn(console, 'log');
    for (var number in inputs) {
      SpellOutNumber(inputs[number]);
      expect(console.log).toHaveBeenCalledWith(outputs[number]);
    }
  });
});

describe('Task 1: split a number string', function() {

  var numbersStr;
  var splitNumbers;

  describe('when number has <= 3 bits', function() {

    beforeEach(function () {
      numbersStr = ['1','99', '300'];
      splitNumbers = [['1'],['99'], ['300']];
    });

    it('return 1 element array ',function (){
      numbersStr.forEach(function(element,index){
        var result = splitInput(element);
        expect(result).toEqual(splitNumbers[index]);
      });
    });
  });

  describe('when number has <= 6 bits && >3', function() {

    beforeEach(function () {
      numbersStr = ['1501','12609', '512607'];
      splitNumbers = [['1', '501'], ['12', '609'], ['512', '607']];
    });

    it('return 2 element array ',function (){

      numbersStr.forEach(function(element,index){
        var result = splitInput(element);
        expect(result).toEqual(splitNumbers[index]);
      });

    });
  });

  describe('when number has <= 9 bits && >6', function() {

    beforeEach(function () {
      numbersStr = ['1001123','12000345', '512607634'];
      splitNumbers = [['1', '001','123'], ['12', '000','345'], ['512', '607','634']];
    });

    it('return 3 element array ',function (){
      numbersStr.forEach(function(element,index){
        var result = splitInput(element);
        expect(result).toEqual(splitNumbers[index]);
      });
    });

  });
});

describe('Task 2: translate string number in English', function() {

  var numbersStr;
  var translatedPieces;
  var dictionary;

  beforeEach(function () {
    dictionary = loadDictionary();
  });

  describe('when string number has 3 bits', function() {

    describe('when all three bits are zero', function() {
      beforeEach(function () {
        numbersStr = ['000'];
        translatedPieces = [''];
      });
      it('return empty array',function (){
        var result = translateStr(numbersStr,dictionary);
        expect(result).toEqual(translatedPieces);
      });

    });

    describe('when number includes two zero char', function() {

      beforeEach(function () {
        numbersStr = ['001','002','003','004','005','006','007','008','009'];
        translatedPieces = [
          dictionary[1],dictionary[2],dictionary[3],
          dictionary[4],dictionary[5],dictionary[6],
          dictionary[7],dictionary[8],dictionary[9]];
      });

      it('return single world',function (){
        var result = translateStr(numbersStr,dictionary);
        expect(result).toEqual(translatedPieces);
      });

    });

    describe('when number includes one zero char', function() {
      describe('when number are special', function() {

        beforeEach(function () {
          numbersStr = [
            '010','011','012','013','014','015','016','017', '018',
            '019','020','030','040','050','060','070','080','090'];
          translatedPieces = [
            dictionary[10],dictionary[11],dictionary[12], dictionary[13],
            dictionary[14],dictionary[15],dictionary[16], dictionary[17],
            dictionary[18],dictionary[19],dictionary[20], dictionary[30],
            dictionary[40],dictionary[50],dictionary[60], dictionary[70],
            dictionary[80],dictionary[90]];
        });

        it('return single world',function (){
          var result = translateStr(numbersStr,dictionary);
          expect(result).toEqual(translatedPieces);
        });

      });

      describe('when number are normal', function() {

        beforeEach(function () {
          numbersStr = ['032','021','099'];
          translatedPieces = ['thirty two','twenty one','ninety nine'];
        });

        it('return two world',function (){
          var result = translateStr(numbersStr,dictionary);
          expect(result).toEqual(translatedPieces);
        });

      });

    });

  });

  describe('when string number has 2 bits', function() {

    describe('when number are normal', function() {

      beforeEach(function () {
        numbersStr = ['42','51','89'];
        translatedPieces = ['forty two','fifty one','eighty nine'];
      });

      it('return two world',function (){
        var result = translateStr(numbersStr,dictionary);
        expect(result).toEqual(translatedPieces);
      });

    });

    describe('when number are special', function() {

      beforeEach(function () {
        numbersStr = [
          '10','11','12','13','14','15','16','17', '18',
          '19','20','30','40','50','60','70','80','90'];
        translatedPieces = [
          dictionary[10],dictionary[11],dictionary[12], dictionary[13],
          dictionary[14],dictionary[15],dictionary[16], dictionary[17],
          dictionary[18],dictionary[19],dictionary[20], dictionary[30],
          dictionary[40],dictionary[50],dictionary[60], dictionary[70],
          dictionary[80],dictionary[90]];
      });

      it('return single world',function (){
        var result = translateStr(numbersStr,dictionary);
        expect(result).toEqual(translatedPieces);
      });

    });

  });

  describe('when string number has 1 bits', function() {

    beforeEach(function () {
      numbersStr = ['1','2','3','4','5','6','7','8','9'];
      translatedPieces = [
        dictionary[1],dictionary[2],dictionary[3],
        dictionary[4],dictionary[5],dictionary[6],
        dictionary[7],dictionary[8],dictionary[9]];
    });

    it('return single world',function (){
      var result = translateStr(numbersStr,dictionary);
      expect(result).toEqual(translatedPieces);
    });



  });

});




describe('Task 3: add unit to translated string number', function() {

  var translatedPieces;
  var unitNumberArr;
  var units;

  beforeEach(function () {
    units = loadUnit();
  });

  describe('when array includes empty elements', function() {
    beforeEach(function () {
      translatedPieces = [
        ['two hundred and forty five','', 'forty three'],
        ['five','',''],
        ['two hundred and forty five','forty three','']
      ];
      unitNumberArr = [
        ['two hundred and forty five million', 'forty three'],
        ['five million'],
        ['two hundred and forty five million','forty three thousand']
      ];
    });
    it('return array with unit without empty elements',function (){

      translatedPieces.forEach(function(element,index){
        var result = addUnit(element,units);
        expect(result).toEqual(unitNumberArr[index]);
      });

    });

  });

  describe('when array is normal', function() {
    beforeEach(function () {
      translatedPieces = [
        [ 'two hundred and forty five','one', 'forty three']
      ];
      unitNumberArr = [
        [ 'two hundred and forty five million','one thousand', 'forty three']
      ];
    });
    it('return array with unit',function (){

      translatedPieces.forEach(function(element,index){
        var result = addUnit(element,units);
        expect(result).toEqual(unitNumberArr[index]);
      });

    });

  });

});

describe('Task 4: merge a NumberArr with unit to a correct string', function() {

  var unitNumberArr;
  var translatedNumberArr;

  describe('when not first element does not includes \'and\' char', function() {
    beforeEach(function () {
      unitNumberArr = [
        [ 'two hundred and forty five million', 'one hundred and twelve thousand', 'forty three'],
        [ 'two hundred and forty five million', 'forty three']
      ];
      translatedNumberArr =  [
        'two hundred and forty five million, one hundred and twelve thousand and forty three',
        'two hundred and forty five million and forty three'
      ];

    });
    it('return should remove quite and add \'and\' char',function (){
      unitNumberArr.forEach(function(element,index){
        var result = mergeUnits(element);
        expect(result).toEqual(translatedNumberArr[index]);
      });

    });

  });

  describe('when first element does not includes \'and\' char', function() {
    beforeEach(function () {
      unitNumberArr = [
        [ 'two hundred million', 'one hundred and twelve thousand', 'forty three'],
        [ 'two hundred thousand', 'forty three'],
        ['two million']
      ];
      translatedNumberArr =  [
        'two hundred million, one hundred and twelve thousand and forty three',
        'two hundred thousand and forty three',
        'two million'
      ];

    });
    it('return string does not have special execute',function (){
      unitNumberArr.forEach(function(element,index){
        var result = mergeUnits(element);
        expect(result).toEqual(translatedNumberArr[index]);
      });

    });

  });

  describe('when inout is normal', function() {
    beforeEach(function () {
      unitNumberArr = [
        [ 'two hundred million', 'one hundred and twelve thousand', 'two hundred and forty three'],
        [ 'two hundred thousand', 'one hundred and forty three']
      ];
      translatedNumberArr =  [
        'two hundred million, one hundred and twelve thousand, two hundred and forty three',
        'two hundred thousand, one hundred and forty three'
      ];

    });
    it('return string does not have special execute',function (){
      unitNumberArr.forEach(function(element,index){
        var result = mergeUnits(element);
        expect(result).toEqual(translatedNumberArr[index]);
      });

    });

  });

});
