import React from "react";
import './Header.css';

function Header() {
    return (
        <div className="header container">
            <div className="header_row row">
                <img className='header_img' src={process.env.PUBLIC_URL + '/image/title_icon_latest.png'} />
            </div>
        </div>
    )
}

export default Header;