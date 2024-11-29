import React, { useState, useContext, useEffect } from "react"
import { Context } from "../store/appContext";
import { CardVehicle } from "./CardVehicle";


export const Vehicles = ({ }) => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getVehicles();
    }, []);
    return (
        <div className="text-center mt-5">
            <h2 className="text-light text-start p-3">Vehicles</h2>
            <div className="row flex-nowrap overflow-auto">
                {store.vehicles && store.vehicles.length > 0 && (
                    store.vehicles.map((singlevehicles, index) => (
                        <CardVehicle vehicles={singlevehicles} key={index} />
                    ))
                )}
            </div>
        </div>
    );
};