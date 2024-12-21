import  {useEffect} from 'react';
import { Menu } from 'antd';
import axios from "axios";
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

    const fetchCurrencies = ()=> {
        axios.get("http://192.168.56.1:8000/cryptocurrencies", {
        }).then((response) => {
            console.log(response.data);
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
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};
export default App;