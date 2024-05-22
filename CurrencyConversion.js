
const config = require("./config.json")
let readline = require('readline')
fs = require('fs');
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
                        let toJson = {result: result}

                        fs.readFile("conversions.json", (err, data) => {
                            let json = [];
                            if (!err && data.length > 0) {
                                try {
                                    json = JSON.parse(data);
                                } catch (e) {
                                    console.log("Error parsing JSON, starting with an empty array");
                                }
                            }
                            json.push(toJson);
                            fs.writeFile("conversions.json", JSON.stringify(json, null, 2), (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            })
                        });

                    }) 
                    })
            })
                    
        })
     

   
    }
    
    enterData()
   

   
}

currencyConversion()