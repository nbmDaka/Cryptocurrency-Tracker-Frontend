import {useEffect, useState} from 'react';
import { Menu } from 'antd';
import axios from "axios";
import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx";
const items = [

            {
                key: 'g1',
                label: 'Список криптовалют',
                type: 'group',
                children: [
                    {
                        key: '1',
                        label: 'Option 1',
                    },
                    {
                        key: '2',
                        label: 'Option 2',
                    },
                ],
            },
];
const App = () => {

    const [currencies, setCurrencies] = useState([]);

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
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const onClick = (e) => {
        console.log('click ', e);
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
                <CryptocurrencyCard></CryptocurrencyCard>
            </div>
        </div>
    );
};
export default App;