import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setsearch] = useState("")
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("https://foodie-api-7tq3.onrender.com/api/foodData", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json();
        // console.log(response);
        setfoodItem(response[0]);
        setfoodCat(response[1]);
    }

    // useEffect is used when the page loads first time, remember to include this dependence in the first line
    // useState can be run on the change while useEffect is run when the website loads first
    // learn more about it's dependencies in 9th video 27:00 timestamp of mern app
    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <Navbar />
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
                            {/* <button className="btn btn-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x600/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x600/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x600/?Paneer" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className='container m-3'>
                {
                    foodCat !== [] ?
                        foodCat.map((data) => {
                            return (
                                <div className='row m-2'>
                                    <div key={data._id} name={data.CategoryName} value={data.CategoryName} className='foodCategory row fs-3 m-3' style={{ color: "white" }}>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem !== [] ?
                                        foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))  //the second check after && is to match the searched word with the item name
                                            .map(filteredItems => {
                                                return (
                                                    <div className='col-sm-12 col-md-6 col-lg-4' style={{ textAlign: "center" }}>
                                                        <Card foodItem={filteredItems} priceOptions={filteredItems.options[0]} />
                                                    </div>
                                                )
                                            }) : <div>No such data found</div>
                                    }
                                </div>
                            );
                        }) :
                        ""
                }
            </div>
            <Footer />
        </div >
    )
}
