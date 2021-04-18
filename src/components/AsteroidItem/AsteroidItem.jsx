import React from 'react';
import classNames from 'classnames';

import './AsteroidItem.sass';

import dino from './dino.svg';
import asteroid from './asteroid.svg';

const AsteroidItem = ({
    id,
    name,
    estimated_diameter,
    date,
    close_approach_date_full,
    miss_distance,
    isDanger,
    dispDistance,
}) => {
    const prettierNum = (num) => {
        return num.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
    };

    const distance =
        dispDistance === 'km'
            ? prettierNum(Math.round(miss_distance.kilometers)) + ' км'
            : prettierNum(Math.round(miss_distance.lunar));

    const size = prettierNum(Math.round(estimated_diameter.estimated_diameter_max)) + ' м';

    const sizeCoef = Math.round(estimated_diameter.estimated_diameter_max) / 70;

    const monthes = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    const dateParse = new Date(date);
    const localeDate =
        dateParse.getDate() + ' ' + monthes[dateParse.getMonth()] + ' ' + dateParse.getFullYear();

    return (
        <div
            className={classNames(
                'asteroid-item',
                { 'asteroid-item--good': !isDanger },
                { 'asteroid-item--bad': isDanger },
            )}>
            <div className="asteroid-item__left">
                <a href="#" className="asteroid-item__title">
                    {name}
                </a>
                <div className="list">
                    <p className="list__item">
                        <span className="list__item-value">{localeDate}</span>
                        <span className="list__item-title">Дата</span>
                    </p>
                    <p className="list__item">
                        <span className="list__item-value">{distance} </span>
                        <span className="list__item-title">Расстояние</span>
                    </p>
                    <p className="list__item">
                        <span className="list__item-value">{size}</span>
                        <span className="list__item-title">Размер</span>
                    </p>
                </div>
            </div>
            <div className="asteroid-item__right">
                <div className="asteroid-mark">
                    <p>Оценка:</p>
                    <p className="asteroid-mark__title">{isDanger ? 'опасен' : 'не опасен'}</p>
                    <button className="btn">На уничтожение</button>
                </div>
            </div>

            <img src={dino} alt="" className="asteroid-item__dino" />
            <img
                src={asteroid}
                alt=""
                className="asteroid-item__img"
                style={{ transform: `scale(${sizeCoef})` }}
            />
        </div>
    );
};

export default AsteroidItem;
