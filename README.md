# Tool for importing transactions into CoinStats

Easily import transactions from Coinmate history CSV into CoinStats.

## How to use

*Currently only working for BTC transactions (code needs to be updated to support more cryptocurrencies).*

1. Make sure to run `npm install` to install dependencies.
2. Download csv history report from Coinmate.
3. Copy the content to the `coinmate/input.csv` file.
4. Leave only header and rows with BUY or QUICK_BUY type.
5. Get token from CoinStats (open network inspector and go to `https://coinstats.app/portfolio/`, find a request with `token` request header).
6. Run `npm run coinmate`.