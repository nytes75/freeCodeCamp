function checkCashRegister(price, cash, cid) {
    var change = cash - price;
    const changeKey = {
        "PENNY" : 0.01,
        "NICKEL" : 0.05,
        "DIME": 0.1,
        "QUARTER" : 0.25,
        "ONE" : 1,
        "FIVE" : 5,
        "TEN" : 10,
        "TWENTY" : 20,
        "ONE HUNDRED" : 100
    }

    if(cash < price){
        return  { status: "INSUFFICIENT_FUNDS", change: [] }
    }else{
        for(let i = 0; i < changeKey.TEN; i++ ){
            console.log("hi")
        }
    }
    return change;
  }
  
  checkCashRegister(19.5, 20, [
      ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
      ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], 
      ["ONE HUNDRED", 100]
    ]
    );