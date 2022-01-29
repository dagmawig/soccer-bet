import React from 'react';
import './Home.css';


function Home() {


    return (
        <div className='home container'>
            <div className='home_row row'>
                <div className='home_header row'>
                    <div className='home_header_title col-12'>
                        WEEKEND MATCHES
                    </div>
                </div>
                <div className='home_button-wrapper btn-group w-100 row' role='group' aria-label='match button'>
                    <button type='button' className='sat_button btn-l col-6'>Saturday Matches</button>
                    <button type='button' className='sun_button btn-l col-6'>Sunday Matches</button>
                </div>
            </div>
        </div>
    )
}

export default Home;