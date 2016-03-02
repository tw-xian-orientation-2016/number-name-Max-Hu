describe('pos', function() {

  beforeEach(function() {

  });

  it('should print correct text', function() {

    var input = ['5000000','99','300','310','1501','12609','512607','40112003','245112043','5002043'];

    var output = [
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

    spyOn(console, 'log');
    for (var number in input) {
      SpellOutNumber(input[number]);
      expect(console.log).toHaveBeenCalledWith(output[number]);
    }

    var expectText = 'ninety nine';


  });

  it('should split string correctly', function() {
    var inputs = ['99','300','1501','12609','512607','43112603'];
    var outputs = [['99'],['300'],['1','501'],['12','609'],['512','607'],['43','112','603']];
    for (var number in inputs) {
      var result = splitInput(inputs[number]);
      expect(result).toEqual(outputs[number]);
    }
  });

  it('should translate correctly', function() {
    var inputs = ['000','245','1','43','112','603','004'];
    var outputs = [ '','two hundred and forty five','one', 'forty three', 'one hundred and twelve', 'six hundred and three','four'];
    var result = translateStr(inputs,loadDictionary());
    expect(result).toEqual(outputs);
  });

  it('should add unit correctly', function() {
    var inputs = [
      [ 'two hundred and forty five','', 'forty three'],
      [ 'two hundred and forty five','one', 'forty three']
    ];
    var outputs = [
      [ 'two hundred and forty five million', 'forty three'],
      [ 'two hundred and forty five million','one thousand', 'forty three'],
    ];
    for (var index in inputs) {
      var result = addUnit(inputs[index],loadUnit());
      expect(result).toEqual(outputs[index]);
    }

  });

  it('should merge unit correctly', function() {
    var inputs = [
      [ 'two hundred and forty five million', 'one hundred and twelve thousand', 'forty three'],
      [ 'two hundred and forty five million', 'forty three'],
      [ 'two hundred and forty five million', 'one hundred and twelve thousand', 'one hundred and forty three'],

    ];
    var outputs =  [
      'two hundred and forty five million, one hundred and twelve thousand and forty three',
      'two hundred and forty five million and forty three',
      'two hundred and forty five million, one hundred and twelve thousand, one hundred and forty three'
    ];
    for (var number in inputs) {
      var result = mergeUnits(inputs[number]);
      expect(result).toEqual(outputs[number]);
    }

  });


});
