import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
	const { store, actions } = useContext(Context);
	const { category, theid } = useParams();
	const [information, setInformation] = useState(null);

	useEffect(() => {
		if (store[category]?.length === 0) {
			if (category === "people") actions.getPeople();
			if (category === "planets") actions.getPlanets();
			if (category === "vehicles") actions.getVehicles();
		}
	}, [category, store[category], actions]);

	useEffect(() => {
		const dataCategory = store[category];
		if (dataCategory) {
			const foundInformation = dataCategory.find((element) => element.uid === theid);
			setInformation(foundInformation);
		}
	}, [store[category], category, theid]);

	if (!information) {
		return (
			<div className="text-center mt-5">
				<h1>Item not found</h1>
			</div>
		);
	}

	const notFoundImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
	const handleImageError = (e) => {
		e.target.src = notFoundImage;
	};

	const imageUrl = (() => {
		switch (category) {
			case "people":
				return `https://starwars-visualguide.com/assets/img/characters/${information.uid}.jpg`;
			case "planets":
				return `https://starwars-visualguide.com/assets/img/planets/${information.uid}.jpg`;
			case "vehicles":
				return `https://starwars-visualguide.com/assets/img/vehicles/${information.uid}.jpg`;
			default:
				return notFoundImage;
		}
	})();

	const renderDetails = () => {
		if (category === "people") {
			return (
				<div className="d-flex justify-content-between p-4 flex-wrap gap-3">
					<p><strong>Gender:</strong> {information.properties.gender}</p>
					<p><strong>Height:</strong> {information.properties.height}</p>
					<p><strong>Skin color:</strong> {information.properties.skin_color}</p>
					<p><strong>Hair Color:</strong> {information.properties.hair_color}</p>
					<p><strong>Eye Color:</strong> {information.properties.eye_color}</p>
					<p><strong>Birth year:</strong> {information.properties.birth_year}</p>

				</div>
			);
		} else if (category === "planets") {
			return (
				<div className="d-flex justify-content-between p-4 flex-wrap gap-3">
					<p><strong>Climate:</strong> {information.properties.climate}</p>
					<p><strong>Diameter:</strong> {information.properties.diameter}</p>
					<p><strong>Rotation period:</strong> {information.properties.rotation_period}</p>
					<p><strong>Orbital period:</strong> {information.properties.orbital_period}</p>
					<p><strong>Gravity:</strong> {information.properties.gravity}</p>
					<p><strong>Terrain:</strong> {information.properties.terrain}</p>
					<p><strong>Population:</strong> {information.properties.population}</p>
				</div>
			);
		} else if (category === "vehicles") {
			return (
				<div className="d-flex justify-content-between p-4 flex-wrap gap-3">
					<p><strong>Model:</strong> {information.properties.model}</p>
					<p><strong>Vehicle class:</strong> {information.properties.vehicle_class}</p>
					<p><strong>Length:</strong> {information.properties.length}</p>
					<p><strong>Max atmosphering speed:</strong> {information.properties.max_atmosphering_speed}</p>
					<p><strong>Passengers:</strong> {information.properties.passengers}</p>
					<p><strong>Manufacturer:</strong> {information.properties.manufacturer}</p>
					<p><strong>Cost in credits:</strong> {information.properties.cost_in_credits}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="container text-center mt-5">
			<div className="cards-container">
				<div className="card-details row bg-white">
					<div className="col-lg-2 col-md-6 col-sm-12 p-3 details-img">
						<img
							src={imageUrl}
							className="card-img-top p-2 image-style"
							alt={information.properties.name || "Item"}
							onError={handleImageError}
						/>
					</div>
					<div className="card-body col-lg-6 col-md-6 col-sm-12">
						<h3 className="card-title">{information.properties.name}</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit fusce montes tempor ut nulla tincidunt,
							est metus purus maecenas laoreet. Penatibus lacus parturient accumsan volutpat conubia habitant potenti,
							rhoncus pretium congue non cras commodo, fames posuere scelerisque luctus suscipit ut.</p>
					</div>
				</div>
			</div>
			<hr />
			<div className="text-start mt-4 bg-white row">
				<h4 className="p-4">Details</h4>
				<div className=" w-auto p-3">
					{renderDetails()}
				</div>
			</div>
		</div>
	);
};
