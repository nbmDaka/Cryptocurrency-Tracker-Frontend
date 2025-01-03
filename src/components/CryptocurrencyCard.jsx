import {Card} from "antd";

function CryptocurrencyCard(props) {

    const { currency } = props
    console.log('Fucking currency',currency)
    const price = currency.quote.USD.price

    return (
        <div>
            <Card title={
                <div className="flex items-center gap-3">
                    <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}/>
                    <span>{currency.name}</span>
                </div>
            } extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>Текущая цена: {price}</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    )
}

export default CryptocurrencyCard;
