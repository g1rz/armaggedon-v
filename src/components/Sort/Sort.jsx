import React from 'react';
import classNames from 'classnames';

import './Sort.sass';

const Sort = ({displayDistance, isShowDanger, handlerSortDanger, handlerDisplayDistance}) => {
    

    return (
        <div className="sort">
            <div className="check">
                <input type="checkbox" className="check__input" id="dangerous" checked={isShowDanger} onChange={() => handlerSortDanger()}/>
                <label htmlFor="dangerous" className="check__label" >
                    Показать только опасные
                </label>
            </div>

            <p className="switch-d">
                Расстояние <span className={classNames('switch-d__link', {active: displayDistance === 'km'})} onClick={() => handlerDisplayDistance()}>в километрах</span>,{' '}
                <span className={classNames('switch-d__link', {active: displayDistance === 'lunar'})} onClick={() => handlerDisplayDistance()}>в дистанциях до луны</span>
            </p>
        </div>
    );
};

export default Sort;
