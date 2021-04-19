import React from 'react';
import axios from 'axios';

import AsteroidItem from '../components/AsteroidItem/AsteroidItem';
import Sort from '../components/Sort/Sort';
import Loader from '../components/Loader/Loader';

import NasaLinks from '../services/NasaLinks';

const Home = () => {
    const nasaService = new NasaLinks();

    const [isLoading, setIsLoading] = React.useState(true);
    const [curDate, setCurDate] = React.useState(new Date());
    const [asteroids, setAsteroids] = React.useState([]);

    const [isShowDanger, setIsShowDanger] = React.useState(false);
    const [displayDistance, setDisplayDistance] = React.useState('km');

    React.useEffect(() => {
        console.log('start');
        loadAsteroids();

        window.addEventListener('scroll', handlerScroll);

        return () => {
            window.removeEventListener('scroll', handlerScroll);
        };
    }, [isLoading, curDate]);

    const loadAsteroids = () => {
        if (isLoading) {
            console.log(nasaService.getAteroidsLink(curDate));
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
                        return item.isDanger || !isShowDanger;
                    });

                    setAsteroids(newAsteroidList);

                    if (newAsteroidList.length < 5) {
                        console.log('malo');
                        changeDayBefore();
                        setIsLoading(true);
                    } else {
                        console.log('ok');
                    }

                    console.log(newAsteroidList);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const changeDayBefore = () => {
        let dateDayAgo = new Date();
        dateDayAgo.setDate(curDate.getDate() - 1);
        setCurDate(dateDayAgo);
    };

    const handlerScroll = () => {
        let windowBottom = document.documentElement.getBoundingClientRect().bottom;
        let windowBottomStop = document.documentElement.clientHeight + 200;

        if (windowBottom < windowBottomStop && !isLoading) {
            changeDayBefore();
            setIsLoading(true);
            console.log(windowBottom + ' - ' + windowBottomStop);
        }
    };

    const handlerSortDanger = () => {
        setIsShowDanger(!isShowDanger);
        setCurDate(new Date());
        setAsteroids([]);
        setIsLoading(true);
        console.log('click');
    };

    const handlerDisplayDistance = () => {
        if (displayDistance === 'km') {
            setDisplayDistance('lunar');
        } else {
            setDisplayDistance('km');
        }
    };

    return (
        <React.Fragment>
            <Sort
                isShowDanger={isShowDanger}
                displayDistance={displayDistance}
                handlerSortDanger={handlerSortDanger}
                handlerDisplayDistance={handlerDisplayDistance}
            />
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
