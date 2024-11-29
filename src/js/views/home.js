import React, { useContext, useEffect } from "react";

import "../../styles/home.css";
import { Context } from "../store/appContext";
import { People } from "../component/People";
import { Planets } from "../component/Planets";
import { Vehicles } from "../component/Vehicles";


export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="text-center mt-5">
			<People></People>
			<Planets></Planets>
			<Vehicles></Vehicles>
		</div>
	)
};
