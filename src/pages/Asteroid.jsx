import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import AsteroidInfo from '../components/AsteroidInfo/AsteroidInfo';
import Loader from '../components/Loader/Loader';
import NasaLinks from '../services/NasaLinks';

const Asteroid = () => {
    const [asteroidObj, setAsteroidObj] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const nasaService = new NasaLinks();
    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(nasaService.getAteroidItemLink(id))
            .then(({ data }) => {
                console.log(data);
                const obj = {
                    id: data.id,
                    name: data.name,
                    isDanger: data.is_potentially_hazardous_asteroid,
                    close_approach_data: data.close_approach_data,
                    estimated_diameter: data.estimated_diameter,
                };
                setAsteroidObj(obj);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <React.Fragment>
            {isLoading && <Loader />}
            {!isLoading && <AsteroidInfo asteroidObj={asteroidObj} />}
        </React.Fragment>
    );
};

export default Asteroid;
