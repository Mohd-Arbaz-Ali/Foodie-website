import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Card(props) {
    const [dataExist, setdataExist] = useState(false);

    let dispatch = useDispatchCart();

    let options = props.priceOptions;

    const data = useCart();
    const priceRef = useRef();

    // an inbuilt javascript function to get the key names from the key value pair of an object, takes that object as an input
    let priceOptions = Object.keys(options);
    const [qty, setqty] = useState('1')
    const [size, setsize] = useState("")

    const handleAddtoCart = async () => {
        if (!localStorage.getItem("authToken")) {
            toast('Please Login to continue', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }

        if (food !== [] && food.size === size) {
            await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
            return;
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        setdataExist(true);
    }

    //when add to cart button is pressed
    let finalPrice = qty * parseInt(options[size]);


    useEffect(() => {
        setsize(priceRef.current.value);
    }, [])

    return (
        <div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="card m-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' style={{ "color": "white" }} onChange={(e) => setqty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option style={{ "color": "white" }} key={i + 1} value={i + 1}>{i + 1}</option>
                                );
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' style={{ "color": "white" }} ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                );
                            })}
                        </select>
                        <div className='d-inline h-100'>₹{finalPrice}/-</div>
                        <hr></hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddtoCart}>
                            {dataExist ? <span>Update</span> : <span>Add to Cart</span>}
                        </button>

                    </div>
                </div >
            </div >
        </div >

    )
}
