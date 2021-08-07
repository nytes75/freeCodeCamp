function telephoneCheck(number){
    var numb = number.length
    var num = number.toString().replace(/\W/g,'').length
    console.log(num);
};

telephoneCheck('555-555-5555');