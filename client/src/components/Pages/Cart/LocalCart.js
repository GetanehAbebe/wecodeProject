import { useState, useEffect } from 'react'



function LocalCart() {
    const [list, setList] = useState([])
    useEffect(() => {
        const cart = localStorage.getItem('cart');
        // const anotherOne = JSON.parse(cart)
        setList(JSON.parse(cart));
        // setList(JSON.parse(cart))
    }, [])
    console.log(list);
    return <ul>
        <h1>Cart </h1>
        {list.map((item, i) => {
            console.log(item);
            return <div className='d-flex m-auto '><li key={i} className='mr-5'>{item.name}</li><li key={i}>{item.pricePerGram}</li></div>
        })}
    </ul >
}
export default LocalCart