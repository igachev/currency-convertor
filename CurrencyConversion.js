
const config = require("./config.json")
let readline = require('readline')
const apiKey = config.api_key

function currencyConversion() {
    const givenDate = process.argv[2]
    let amount = 0;
    let baseCurrency = "";
    let targetCurrency = "";

    let rl = readline.createInterface(process.stdin,process.stdout)
    
    let enterData = function() {

        rl.question("",function(selectedAmount) {
            amount = selectedAmount
            console.log("amount:" + selectedAmount)

            rl.question("",function(selectedBaseCurrency) {
                baseCurrency = selectedBaseCurrency.toUpperCase()
                console.log("base currency:" + selectedBaseCurrency)

                rl.question("",function(selectedTargetCurrency) {
                    targetCurrency = selectedTargetCurrency.toUpperCase()
                    console.log("target currency:" + selectedTargetCurrency)

                    const url = `https://api.fastforex.io/historical?date=${givenDate}&from=${baseCurrency}&api_key=${apiKey}`
                    fetch(url)
                    .then((res) => res.json())
                    .then((data) => {
                        let currentExchangeRate = Number(data.results[targetCurrency])
                        let calculation = amount * currentExchangeRate
                        let result = `${amount} ${baseCurrency} is ${calculation.toFixed(2)} ${targetCurrency}`
                        console.log(result)
                    })
                    
                    })
            })
            
                
        })
     

   
    }
    
    enterData()
   

   
}

currencyConversion()