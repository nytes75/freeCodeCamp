function rot13(str) {
    let alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    return str.split(" ").map((a) => a.split("").
                map((b) => {
                if(alph.indexOf(b) <= -1){
                    return b
                }else { 
                    var ind = alph.indexOf(b) + 13
                    if(!ind){
                        return b
                    }
                    else if(ind >= 26){
                        return (alph[ind - 26])
                    }else{
                        return (alph[ind])
                        }
                    }
                }).join('')).join(" ")
  }
  
console.log(rot13("SERR PBQR PNZC$"));
