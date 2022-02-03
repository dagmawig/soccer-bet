import React from "react";
import './Header.css';
import { useDispatch } from 'react-redux';
import { reset } from './betSlice';


function Header() {

    const dispatch = useDispatch();

    function logout() {
        localStorage.setItem("soccerBet_userID", "");

        dispatch(reset());

        window.location.reload();
    }

    function openReset() {
        window.$('#resetAccount').modal('show');
    }

    
    return (
        <div className="header container">
            <div className="header_row row">
                <div className="reset_button_wrapper col-3">
                    <button className="reset_button btn" onClick={openReset}>
                        <i className="fa fa-refresh fa-lg"></i>
                    </button>
                </div>
                <div className="logout_button_wrapper col-3">
                    <button className="logout_button btn" onClick={logout}>
                        <i className="fa fa-power-off fa-lg"></i>
                    </button>
                </div>
                {/* <img className='header_img' src={process.env.PUBLIC_URL + '/image/title_icon_latest.png'} /> */}
            </div>

            
        </div>
    )
}

export default Header;