import React from 'react';
import './Loading.css';
import { useSelector } from 'react-redux';


function Loading() {
    const stateSelector = useSelector((state) => state.bet);
    let loading = stateSelector.loading;
    return (
        <div className="loading" style={{ display: loading ? 'block' : 'none' }}>
           <div className="loading_row row">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw col-12"></span>
                <div className="col-12 text">Loading . . . </div>
            </div>
        </div>

    );
}

export default Loading;