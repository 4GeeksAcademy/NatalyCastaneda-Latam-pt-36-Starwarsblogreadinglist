import React, { useState, useEffect } from "react";

const MiComponente = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="loading-animation">
                    <p>Cargando...</p>
                </div>
            ) : (
                // Muestra el contenido principal
                <div className="content">
                    <h1>¡Contenido cargado!</h1>
                    <p>Este es el contenido de tu página.</p>
                </div>
            )}
        </div>
    );
};

export default MiComponente;