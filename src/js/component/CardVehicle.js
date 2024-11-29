import React, { useState, useContext, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CardVehicle = ({ vehicles }) => {
    const { store, actions } = useContext(Context);
    const [isClicked, setIsClicked] = useState(false);
    // const [vehicleInfo, setVehiclesInfo] = useState({})
    const getVehicles = async () => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/vehicles/${vehicles.uid}`)
            const responseBody = await response.json()
            setVehiclesInfo(responseBody.result.properties)
        } catch (error) {
            console.log(error)
        }
    }
    // useEffect(() => {
    //     getVehicles();
    // }, [])
    const imageVehicles = `https://starwars-visualguide.com/assets/img/vehicles/${vehicles.uid}.jpg`;

    const handleFavoriteClick = () => {
        setIsClicked(!isClicked);
        if (!isClicked) {
            actions.addFavorite(vehicles.properties.name, "vehicles", vehicles.uid);
        } else {
            actions.removeFavorite(vehicles.properties.name);
        }
    };
    useEffect(() => {
        setIsClicked(store.favorites.find((fav) => fav.name == vehicles.properties.name));
    }, [store.favorites, vehicles.properties.name]);

    const handleImageError = (e) => {
        e.target.src = notFoundImage;
        e.target.style.width = "100%";
        e.target.style.height = "230px";
    }
    return (
        <div className="card m-2" style={{ width: "16rem" }}>
            <img src={imageVehicles} className="card-img-top p-2" alt={vehicles.properties.name || "Vehicles"} onError={handleImageError} />
            <div className="card-body">
                <h5 className="card-title">{vehicles.properties.name}</h5>
                <p className="card-text">Model: {vehicles.properties.model}</p>
                <p className="card-text">Passengers: {vehicles.properties.passengers}</p>
                <p className="card-text">Price: {vehicles.properties.cost_in_credits}</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/vehicles/${vehicles.uid}`} className="btn btn-primary">Learn more!</Link>
                    <button
                        type="button"
                        className={`btn ${isClicked ? "btn-warning clicked" : "btn-outline-warning"}`}
                        onClick={handleFavoriteClick}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </div>
            </div>
        </div >
    );

}