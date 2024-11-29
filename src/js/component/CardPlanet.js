import React, { useState, useContext, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CardPlanet = ({ planets }) => {
    const { store, actions } = useContext(Context);
    const [isClicked, setIsClicked] = useState(false);
    // const [planetInfo, setPlanetInfo] = useState({})
    const notFoundImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    const getPlanets = async () => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/planets/${planets.uid}`)
            const responseBody = await response.json()
            setPlanetInfo(responseBody.result.properties)
        } catch (error) {
            console.log(error)
        }
    }
    // useEffect(() => {
    //     getPlanets();
    // }, [])
    const imagePlanet = `https://starwars-visualguide.com/assets/img/planets/${planets.uid}.jpg`;

    const handleFavoriteClick = () => {
        setIsClicked(!isClicked);
        if (!isClicked) {
            actions.addFavorite(planets.properties.name, "planets", planets.uid);
        } else {
            actions.removeFavorite(planets.properties.name);
        }
    };
    useEffect(() => {
        setIsClicked(store.favorites.find((fav) => fav.name == planets.properties.name));
    }, [store.favorites, planets.properties.name]);

    const handleImageError = (e) => {
        e.target.src = notFoundImage;
        e.target.style.width = "100%";
        e.target.style.height = "230px";
    };
    return (
        <div className="card m-2" style={{ width: "16rem" }}>
            <img
                src={imagePlanet}
                className="card-img-top p-2" alt={planets.properties.name || "Planet"} onError={handleImageError} />
            <div className="card-body">
                <h5 className="card-title">{planets.properties.name}</h5>
                <p className="card-text">Climate: {planets.properties.climate}</p>
                <p className="card-text">Gravity: {planets.properties.gravity}</p>
                <p className="card-text">Population: {planets.properties.population}</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/planets/${planets.uid}`} className="btn btn-primary">Learn more!</Link>
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