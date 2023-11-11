import { createReadStream } from 'fs';
import Papa from 'papaparse';

const TOKEN = '<token>';

Papa.parse(createReadStream('coinmate/input.csv'), {
    delimiter: ';',
    header: true,
    complete: (results) => {
        for (const body of transformResultsToBodies(results)) {
            sendPostRequest(body);
        }
    }
});

function transformResultsToBodies(results) {
    var bodies = []
    for (const tx of results.data) {
        bodies.push({
            portfolioId: "ctGUhXhA0QOrcxSn",
            coinSymbol: "BTC", // TODO enable multiple coins
            coinId: "bitcoin", // TODO enable multiple coins
            count: tx.Amount,
            price: tx.Price,
            userCurrency: "CZK",
            notes: "",
            date: Date.parse(tx.Date),
            isDeductEnabled: false,
            type: "buy",
            pairCoin: "CZK",
            exchange: "CoinMate",
            fromExchange: "",
            toExchange: "",
            fee: {
                // amount: tx.Fee,
                coinId: "FiatCoinCZK"
            },
            piVersion: "v6"
        })
    }
    return bodies;
}

async function sendPostRequest(body) {
    try {
        const response = await fetch("https://api.coin-stats.com/v6/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": TOKEN
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();
        console.log("Successfully imported tx from:", new Date(body.date));
    } catch (error) {
        console.error("Error:", error);
    }
}