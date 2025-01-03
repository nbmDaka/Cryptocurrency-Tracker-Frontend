import {useEffect, useState} from 'react';
import {Menu, Spin} from 'antd';
import axios from "axios";
import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx";


const App = () => {

    const [currencies, setCurrencies] = useState([]);
    const [currency_id, setCurrencyId] = useState(1);
    const [currencyData, setCurrencyData] = useState(null);

    const fetchCurrencies = ()=> {
        axios.get("http://192.168.56.1:8000/cryptocurrencies", {
        }).then((response) => {
            console.log("response", response);
            const currenciesResponse = response.data;
            const menuItems = [
                {
                    key: 'g1',
                    label: 'Список криптовалют',
                    type: 'group',
                    children: currenciesResponse.map((item) => {
                        return {label: item.name, key: item.id}
                    })
                },
            ]
            setCurrencies(menuItems);
        }).catch((error) => {
            console.error('fucking error is',error);
        });
    };

    const fetchCurrency = ()=> {
        axios.get(`http://192.168.56.1:8000/cryptocurrencies/${currency_id}`, {
        }).then((response) => {
            const data = Object.values(response.data)[0]; // Get the first value in the object
            console.log("second response", data);
            setCurrencyData(data);
        }).catch((error) => {
            console.error('fucking error is',error);
        });
    };



    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        setCurrencyData(null)
        fetchCurrency();
    }, [currency_id]);

    const onClick = (e) => {
        console.log('click ', e);
        setCurrencyId(e.key)
    };
    return (
        <div className="flex ">
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={currencies}
                className="h-screen overflow-scroll"
            />
            <div className="mx-auto my-auto">
                {currencyData ? <CryptocurrencyCard currency={currencyData}/> : <Spin size='large'/>}
            </div>
        </div>
    );
};
export default App;