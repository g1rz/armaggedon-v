import React from 'react';
import axios from 'axios';

import AsteroidItem from '../components/AsteroidItem/AsteroidItem';
import Sort from '../components/Sort/Sort';
import Loader from '../components/Loader/Loader';

import NasaLinks from '../services/NasaLinks';

const Home = () => {
    const nasaService = new NasaLinks();

    const [isLoading, setIsLoading] = React.useState(true);
    const [curDate, setCurDate] = React.useState(new Date(Date.now() - 86400000));
    const [asteroids, setAsteroids] = React.useState([]);
    const [visibleAsteroids, setVisibleAsteroids] = React.useState([]);

    const [isShowDanger, setIsShowDanger] = React.useState(false);
    const [displayDistance, setDisplayDistance] = React.useState('km');

    React.useEffect(() => {
        loadAsteroids();
        //     if (asteroids.length < 10) {
        //         let dateDayAgo = new Date();
        //         dateDayAgo.setDate(curDate.getDate() - 1);
        //         setCurDate(dateDayAgo);
        //         loadAsteroids();
        //     } 
        window.addEventListener('scroll', handlerScroll);

        return () => {
            window.removeEventListener('scroll', handlerScroll);
        };
    }, [isLoading]);

    const loadAsteroids = () => {
        if (isLoading) {
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

                    const newAsteroidList = [...asteroids, ...asteroidsList].filter((item) => {
                        return item.isDanger || !isShowDanger ;
                    });
                    setAsteroids(newAsteroidList);

                    console.log(newAsteroidList);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const handlerScroll = () => {
        let windowBottom = document.documentElement.getBoundingClientRect().bottom;
        let windowBottomStop = document.documentElement.clientHeight + 200;

        if (windowBottom < windowBottomStop && !isLoading) {
            let dateDayAgo = new Date();
            dateDayAgo.setDate(curDate.getDate() - 1);
            setCurDate(dateDayAgo);
            setIsLoading(true);
            console.log(windowBottom + ' - ' + windowBottomStop);
        }
    };

    const handlerSortDanger = () => {
        setIsShowDanger(!isShowDanger);
        setIsLoading(true);
        loadAsteroids();
        console.log('click');
    }

    const handlerDisplayDistance = () => {
        if (displayDistance === 'km') {
            setDisplayDistance('lunar');
        } else {
            setDisplayDistance('km');
        }
    }

    return (
        <React.Fragment>
            <Sort isShowDanger={isShowDanger} displayDistance={displayDistance} handlerSortDanger={handlerSortDanger} handlerDisplayDistance={handlerDisplayDistance} />
            <div className="asteroid-list">
                {asteroids !== []
                    ? asteroids.map((item) => (
                          <AsteroidItem {...item} displayDistance={displayDistance} key={item.id} />
                      ))
                    : false}
                {isLoading ? <Loader /> : false}
            </div>
        </React.Fragment>
    );
};

export default Home;
