import React,{useState,useEffect,useRef} from 'react';

//API
import { getCoin } from '../Services/Api';

//components
import Loader from './Loader';
import Coin from './Coin';

//style
import styles from './Landing.module.css';

const Landing = () => {

    const inputRef = useRef();

    const [coins,setCoins] = useState([]);
    const [search,setSearch] = useState('');
    

    useEffect(() => {
        const fetchAPI = async () => {
           const data = await getCoin();
            console.log(data);
            setCoins(data)
        }
        fetchAPI();
        inputRef.current.focus()
    },[])

    const searchHandler = (event) =>{
        setSearch(event.target.value)

    }

    const searchCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
    

    return (
        <>
        <input 
        className={styles.input} 
        type='text' 
        placeholder='Search...' 
        value={search} 
        onChange={searchHandler}
        ref={inputRef}
        />
        {
            coins.length ?
        <div className={styles.coinContainer}>
            <div className={styles.nameList}>
                <span className={styles.hashtag}>#</span>
                <span className={styles.name}>Name</span>
                <span className={styles.symbol}>Symbol</span>
                <span className={styles.price}>Price</span>
                <span>Price-Change</span>
                <span>Market-Cap</span> 
            </div>
            {
                searchCoins.map(coin => <Coin
                key={coin.id}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                price={coin.current_price}
                marketCap={coin.market_cap}
                priceChange={coin.price_change_percentage_24h}
                
                />
                )
            }
        </div> :
        <Loader/>

        }
       
        </>
    );
};

export default Landing;
