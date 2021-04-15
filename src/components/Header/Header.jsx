import React from 'react';

import './Header.sass';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-row">
                    <div className="header-item">
                        <p className="logo">ARMAGGEDON V</p>
                        <p className="logo-text">
                            Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.
                        </p>
                    </div>
                    <div className="header-item">
                        <div className="links">
                            <a href="#" className="links__item active">
                                Астероиды
                            </a>
                            <a href="#" className="links__item">
                                Уничтожение
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
