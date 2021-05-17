function convertToRoman(num) {
    var romanNumerals = ['M', 'D', 'C', 'L', 'X', 'V','I'];//[1000,500,100,50,10,5,1]
    // Unfortunately we can only go to 3999
    let store = [];
    function unit(num, romArr){
        if(num < 4){
            store.push(romArr[2].repeat(num))
        }else if(num == 4) {
            store.push(romArr[2] + romArr[1])
        }else if(num == 5) {
            store.push(romArr[1])
        }else if(num > 5 && num < 9){
            store.push(romArr[1] + romArr[2].repeat(num - 5))
        }else if( num == 9){
            store.push(romArr[2] + romArr[0])
        }else{
            store.push(' ')
        }
    }
    function grand(num){
        if(num >= 4){
            return "sorry our limit is 3999 and below"
        }else{
            store.push('M'.repeat(num))
        }
    }
    if(num > 3999){
        return "Unfortunately we can only reach 3999";
    }else{
        let thousandArr = [romanNumerals[0]]
        let hundredArr = [romanNumerals[0], romanNumerals[1], romanNumerals[2]]
        let tenArr = [romanNumerals[2],romanNumerals[3],romanNumerals[4]]
        let oneArr = [romanNumerals[4],romanNumerals[5], romanNumerals[6]]
        var strNum = num.toString().split('');
        if(strNum.length == 4){
            grand(strNum[0])
            unit(strNum[1], hundredArr)
            unit(strNum[2], tenArr)
            unit(strNum[3], oneArr)
        }
        else if(strNum.length == 3){
            unit(strNum[0], hundredArr)
            unit(strNum[1], tenArr)
            unit(strNum[2], oneArr)
        }
        else if(strNum.length == 2){
        
            unit(strNum[0], tenArr)
            unit(strNum[1], oneArr)
        }
        else if(strNum.length == 1){
            unit(strNum[0], oneArr)
        }else {
            return 'Did you enter a number..?'
        }
    }
    console.log(store.join(''))
}
convertToRoman(3999);