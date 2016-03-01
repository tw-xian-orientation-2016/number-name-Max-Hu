describe('pos', function() {
  var allItems;
  var inputs;
  var shopList;
  var shopListDetail;
  var cartItem

  beforeEach(function() {

  });

  it('should print correct text', function() {

    var input = ['99','300','310','1501','12609','512607','43112603'];

    var output = [
      'ninety nine',
      'three hundred',
      'three hundred and ten',
      'one thousand, five hundred and one',
      'twelve thousand, six hundred and nine',
      'five hundred and twelve thousand, six hundred and seven',
      'forty three million, one hundred and twelve thousand, six hundred and three'
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
    var inputs = ['43','112','603'];
    var outputs = ['forty three million', 'one hundred and twelve thousand', 'six hundred and three'];
    var result = translateString(inputs[number]);
    expect(result).toEqual(outputs[number]);
  });

});
