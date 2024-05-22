
const config = require("./config.json")
let readline = require('readline')
const apiKey = config.api_key

function currencyConversion() {
    const givenDate = process.argv[2]
    
    let rl = readline.createInterface(process.stdin,process.stdout)
    

    let enterAmount = function() {
        rl.question("",function(amount) {
            console.log(typeof amount)
        })
    }
    
    enterAmount()

    const url = `https://api.fastforex.io/fetch-all?api_key=${apiKey}`
  //  console.log(url)
}

currencyConversion()