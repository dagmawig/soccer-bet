import React, { useState } from 'react';
import './Home.css';




function Home() {

    const [disArr, changeDis] = useState(['', 'none']);

    let jObj = {
        "Leeds United": "Leeds",
        "Arsenal": "Arsenal",
        "Manchester City": "ManchesterCity",
        "Liverpool": "Liverpool",
        "Chelsea": "Chelsea",
        "Manchester United": "ManchesterUnited",
        "West Ham United": "WestHam",
        "Tottenham": "Tottenham",
        "Wolves": "Wolves",
        "Brighton &amp; Hove Albion": "BrightonandHoveAlbion",
        "Leicester": "LeichesterCity",
        "Aston Villa": "AstonVilla",
        "Southampton": "Southampton",
        "Crystal Palace": "CrystalPalace",
        "Brentford": "Brentford",
        "Everton": "Everton",
        "Norwich City": "NorwichCity",
        "Newcastle United": "Newcastle",
        "Watford": "Watford",
        "Burnley": "Burnley"
    }

    let fixture = [
        {
            "success": true,
            "data": [
                {
                    "teamName": [
                        "Manchester United",
                        "Southampton"
                    ],
                    "score": null,
                    "liveScore": null,
                    "time": "12:30",
                    "date": "2022-02-12"
                },
                {
                    "teamName": [
                        "Brentford",
                        "Crystal Palace"
                    ],
                    "score": null,
                    "liveScore": null,
                    "time": "15:00",
                    "date": "2022-02-12"
                },
                {
                    "teamName": [
                        "Everton",
                        "Leeds United"
                    ],
                    "score": null,
                    "liveScore": null,
                    "time": "15:00",
                    "date": "2022-02-12"
                },
                {
                    "teamName": [
                        "Watford",
                        "Brighton &amp; Hove Albion"
                    ],
                    "score": null,
                    "liveScore": null,
                    "time": "15:00",
                    "date": "2022-02-12"
                },
                {
                    "teamName": [
                        "Norwich City",
                        "Manchester City"
                    ],
                    "score": null,
                    "liveScore": null,
                    "time": "17:30",
                    "date": "2022-02-12"
                }
            ]
        },
        {
            "success": false,
            "message": "no games on this date"
        }
    ]

    function showSat(e) {
        changeDis(['', 'none']);
    }
    function showSun(e) {
        changeDis(['none', '']);
    }
    function jersey(teamName) {
        let link = "https://pbteams.nbc-sports-boom-fantasy.com/cdn-cgi/image/f=auto,fit=contain,width=200/https://pbteams.s3.amazonaws.com/" + jObj[teamName] + "2021.png";

        return (
            <img className='jersey_img' alt='jersey' src={link} onError={
                ({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = process.env.PUBLIC_URL + '/image/jersey_dummy.png';
                }
            } />
        );
    }

    function matchDiv(day) {
        let dayArr = ["Saturday", "Sunday"];
        let matchArr = (fixture[day].success) ? fixture[day].data : [];
        const ans = (matchArr.length === 0) ? (
            <div className='home_match row'>
                <b>No match this {dayArr[day]}!</b>
            </div>
        ) : matchArr.map((fixture) => {
            return (
                <div className='home_match row'>
                    <div className='match_time row'>
                        <div className='time_text col-6'>
                            {fixture.time} UK Time
                        </div>
                    </div>
                    <div className='match_team row'>
                        <div className='match_team_info col-4'>
                            <div className='match_team_jersey row'>
                                <div className='jersey col-12'>
                                    {jersey(fixture.teamName[0])}
                                </div>
                            </div>
                            <div className='match_team_name row'>
                                <div className='team_name_text col-12'>
                                    {fixture.teamName[0].replace('&amp;', '&')}
                                </div>

                            </div>
                        </div>
                        <div className='bet_button_wrapper col-4'>
                            <button type='button' className='bet_button btn'>BET</button>
                        </div>
                        <div className='match_team_info col-4'>
                            <div className='match_team_jersey row'>
                                <div className='jersey col-12'>
                                    {jersey(fixture.teamName[1])}
                                </div>

                            </div>
                            <div className='match_team_name row'>
                                <div className='team_name_text col-12'>
                                    {fixture.teamName[1].replace('&amp;', '&')}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return ans;
    }

    return (
        <div className='home container'>
            <div className='home_row row'>
                <div className='home_header row'>
                    <div className='home_header_title col-12'>
                        WEEKEND MATCHES
                    </div>
                </div>
                <div className='home_button_wrapper row' >
                        <button type='button' className='sat_button btn col-5' onClick={showSat}>Saturday 01/29</button>
                        <button type='button' className='sun_button btn col-5' onClick={showSun}>Sunday 01/30</button>
                  
                </div>
                <div className='home_match_wrapper row'>
                    {(disArr[0] === '') ? matchDiv(0) : null}

                    {(disArr[1] === '') ? matchDiv(1) : null}
                </div>
            </div>
        </div>
    )
}

export default Home;