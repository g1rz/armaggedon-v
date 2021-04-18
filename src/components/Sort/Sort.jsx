import React from 'react';

import './Sort.sass';

const Sort = () => {
    return (
        <div className="sort">
            <div className="check">
                <input type="checkbox" className="check__input" id="dangerous" />
                <label htmlFor="dangerous" className="check__label">
                    Показать только опасные
                </label>
            </div>

            <p className="switch-d">
                Расстояние <span className="switch-d__link active">в километрах</span>,{' '}
                <span className="switch-d__link">в дистанциях до луны</span>
            </p>
        </div>
    );
};

export default Sort;
