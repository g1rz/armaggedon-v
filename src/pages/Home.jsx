import React from 'react';
import axios from 'axios';

import AsteroidItem from '../components/AsteroidItem/AsteroidItem';
import Sort from '../components/Sort/Sort';
import Loader from '../components/Loader/Loader';

import NasaLinks from '../services/NasaLinks';

const Home = () => {
    const nasaService = new NasaLinks();

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isFetchingData, setIsFetchingData] = React.useState(true);
    const [curDate, setCurDate] = React.useState(new Date(Date.now() - 86400000));
    const [asteroids, setAsteroids] = React.useState([]);

    const [dispDistance, setDispDistance] = React.useState('km');

    React.useEffect(() => {
        loadAsteroids();
        window.addEventListener('scroll', handlerScroll);

        return () => {
            window.removeEventListener('scroll', handlerScroll);
        };
    }, [isFetchingData]);

    const loadAsteroids = () => {
        if (isFetchingData) {
            setIsLoaded(false);
            axios
                .get(nasaService.getAteroidsLink(curDate))
                .then(({ data }) => {
                    const asteroidsList = Object.values(data.near_earth_objects)[0].map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            estimated_diameter: item.estimated_diameter.meters,
                            date: item.close_approach_data[0].close_approach_date,
                            miss_distance: item.close_approach_data[0].miss_distance,
                            isDanger: item.is_potentially_hazardous_asteroid,
                        };
                    });

                    const newAsteroidList = [...asteroids, ...asteroidsList];
                    setAsteroids(newAsteroidList);

                    console.log(newAsteroidList);
                })
                .finally(() => {
                    setIsLoaded(true);
                    setIsFetchingData(false);
                });
        }
    };

    const handlerScroll = () => {
        let windowBottom = document.documentElement.getBoundingClientRect().bottom;
        let windowBottomStop = document.documentElement.clientHeight + 200;

        if (windowBottom < windowBottomStop && !isFetchingData) {
            let dateDayAgo = new Date();
            dateDayAgo.setDate(curDate.getDate() - 1);
            setCurDate(dateDayAgo);
            setIsFetchingData(true);
            console.log(windowBottom + ' - ' + windowBottomStop);
        }
    };

    return (
        <React.Fragment>
            <Sort />
            <div className="asteroid-list">
                {asteroids !== []
                    ? asteroids.map((item) => (
                          <AsteroidItem {...item} dispDistance={dispDistance} key={item.id} />
                      ))
                    : false}
                {!isLoaded ? <Loader /> : false}
            </div>
        </React.Fragment>
    );
};

export default Home;
