import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { setLoading, updateFixture, updateUserData } from './betSlice';
import { useSelector, useDispatch } from 'react-redux';



function Home() {

    const [disArr, changeDis] = useState(['', 'none']);
    const [teamArr, changeTeam] = useState([]);
    const [gameDate, changeGameDate] = useState('');
    const [betScore, changeBetScore] = useState(['', '']);
    const stateSelector = useSelector(state => state.bet);
    const dispatch = useDispatch();
    useEffect(() => {

        async function loadUserData() {
            let res = await axios.post('http://localhost:3001/loadData', { userID: localStorage.getItem("soccerBet_userID"), email: localStorage.getItem("email") });

            return res;
        }

        dispatch(setLoading(true));

        loadUserData()
            .then(res => {
                let data = res.data;

                console.log(data);
                if (data.success) {
                    dispatch(updateUserData(data.data.userData))
                    dispatch(updateFixture(data.data.fixture))
                    dispatch(setLoading(false));
                }
                else {
                    dispatch(setLoading(false));
                    alert(data.err);
                }

            })
    }, []);

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

    let fixture = stateSelector.fixture;
    let currentBet = stateSelector.userData.betData.currentBet;

    function teamsInBet(teamName, betArr) {
        for (let betObj of betArr) {
            if (betObj.teams[0] === teamName[0] && betObj.teams[1] === teamName[1]) return true;
        }

        return false;
    }

    function indexOfBet(teamName, betArr) {
        for (let i=0; i<betArr.length; i++) {
            if (betArr[i].teams[0] === teamName[0] && betArr[i].teams[1] === teamName[1]) return i;
        }

        return false;
    }

    function openBet(e) {
        changeBetScore(['', '']);
        let id = e.target.id;
        let fIndex = parseInt(id[0]);
        let sIndex = parseInt(id[1]);
        changeTeam(fixture[fIndex].data[sIndex].teamName);
        changeGameDate(fixture[fIndex].data[sIndex].date)
        console.log(e.target.id)
        window.$('#betOnMatch').modal('show');
    }
    function openUpdateBet(e) {
        changeBetScore(['', '']);
        let id = e.target.id;
        let fIndex = parseInt(id[0]);
        let sIndex = parseInt(id[1]);
        changeTeam(fixture[fIndex].data[sIndex].teamName);
        changeGameDate(fixture[fIndex].data[sIndex].date)
        console.log(e.target.id)
        window.$('#updateBetOnMatch').modal('show');
    }
    function openDeleteBet(e) {
        changeBetScore(['', '']);
        let id = e.target.id;
        let fIndex = parseInt(id[0]);
        let sIndex = parseInt(id[1]);
        changeTeam(fixture[fIndex].data[sIndex].teamName);
        window.$('#deleteBetOnMatch').modal('show');
    }
    function handleBet() {
        if (betScore[0] === '' || betScore[1] === '') {
            alert("Please enter score prediction");
            return;
        }
        let score = [parseInt(betScore[0]), parseInt(betScore[1])];
        console.log(betScore)
        async function betOnMatch() {
            let res = await axios.post('http://localhost:3001/betOnMatch', { userID: localStorage.getItem("soccerBet_userID"), teams: teamArr, gameDate: gameDate, betScore: score });

            return res;
        }


        dispatch(setLoading(true));
        window.$('#betOnMatch').modal('hide');

        betOnMatch().then(res => {
            let data = res.data;
            if (data.success) {
                dispatch(updateUserData(data.data.userData))
                dispatch(updateFixture(data.data.fixture))
                dispatch(setLoading(false));
                alert("Bet Success!");
            }
            else {
                dispatch(setLoading(false));
                alert(data.err)
            }
        })
    }

    function handleUpdateBet() {
        if (betScore[0] === '' || betScore[1] === '') {
            alert("Please enter score prediction");
            return;
        }
        let score = [parseInt(betScore[0]), parseInt(betScore[1])];
        console.log(betScore);
        async function updateBetOnMatch() {
            let res = await axios.post('http://localhost:3001/updateBet', { userID: localStorage.getItem("soccerBet_userID"), teams: teamArr, betScore: score });

            return res;
        }

        dispatch(setLoading(true));
        window.$('#updateBetOnMatch').modal('hide');

        updateBetOnMatch().then(res => {
            let data = res.data;
            if (data.success) {
                dispatch(updateUserData(data.data.userData))
                dispatch(setLoading(false));
                alert("Bet Update Success!");
            }
            else {
                dispatch(setLoading(false));
                alert(data.err)
            }
        })
    }

    function handleDeleteBet() {
        async function deleteBetOnMatch() {
            let res = await axios.post('http://localhost:3001/removeBet', { userID: localStorage.getItem("soccerBet_userID"), teams: teamArr });

            return res;
        }

        dispatch(setLoading(true));
        window.$('#deleteBetOnMatch').modal('hide');

        deleteBetOnMatch().then(res => {
            let data = res.data;
            if (data.success) {
                dispatch(updateUserData(data.data.userData))
                dispatch(setLoading(false));
                alert("Bet Deletion Success!");
            }
            else {
                dispatch(setLoading(false));
                alert(data.err)
            }
        })

    }

    function handleClose() {
        changeBetScore(['', '']);
        changeTeam([]);
        changeGameDate('');
    }
    // let fixture = [
    //     {
    //         "success": true,
    //         "data": [
    //             {
    //                 "teamName": [
    //                     "Manchester United",
    //                     "Southampton"
    //                 ],
    //                 "score": null,
    //                 "liveScore": null,
    //                 "time": "12:30",
    //                 "date": "2022-02-12"
    //             },
    //             {
    //                 "teamName": [
    //                     "Brentford",
    //                     "Crystal Palace"
    //                 ],
    //                 "score": null,
    //                 "liveScore": null,
    //                 "time": "15:00",
    //                 "date": "2022-02-12"
    //             },
    //             {
    //                 "teamName": [
    //                     "Everton",
    //                     "Leeds United"
    //                 ],
    //                 "score": null,
    //                 "liveScore": null,
    //                 "time": "15:00",
    //                 "date": "2022-02-12"
    //             },
    //             {
    //                 "teamName": [
    //                     "Watford",
    //                     "Brighton &amp; Hove Albion"
    //                 ],
    //                 "score": null,
    //                 "liveScore": null,
    //                 "time": "15:00",
    //                 "date": "2022-02-12"
    //             },
    //             {
    //                 "teamName": [
    //                     "Norwich City",
    //                     "Manchester City"
    //                 ],
    //                 "score": null,
    //                 "liveScore": null,
    //                 "time": "17:30",
    //                 "date": "2022-02-12"
    //             }
    //         ]
    //     },
    //     {
    //         "success": false,
    //         "message": "no games on this date"
    //     }
    // ]
    function getDateStr(date) {
        let yearStr = date.getUTCFullYear().toString();
        let monthStr = Math.floor((date.getUTCMonth() + 1) / 10).toString() + ((date.getUTCMonth() + 1) % 10).toString();
        let dateStr = Math.floor(date.getUTCDate() / 10).toString() + (date.getUTCDate() % 10).toString();

        return monthStr + "/" + dateStr;
    }
    function getMatchDates() {
        let date = new Date();
        let day = date.getUTCDay();
        let diff = (day === 0) ? -1 : 6 - day;
        let gameDay1 = new Date(date.getTime() + (diff * 24 * 3600 * 1000));
        let gameDay2 = new Date(date.getTime() + ((diff + 1) * 24 * 3600 * 1000));
        let dateStr1 = getDateStr(gameDay1);
        let dateStr2 = getDateStr(gameDay2);

        return [dateStr1, dateStr2];
    }

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
        ) : matchArr.map((fixture, i) => {
            return (
                <div className='home_match row'>
                    <div className='match_time row'>
                        <div className='time_text col-6'>
                            {fixture.time} UK Time
                        </div>
                    </div>
                    <div className='match_team row'>
                        <div className='match_team_info col-3'>
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
                        <div className='bet_button_wrapper col-6'>
                            {(teamsInBet(fixture.teamName, currentBet)) ? (<div className='button_grp row'>
                            <div className="bet_score_text">
                                Your Bet: {`${currentBet[indexOfBet(fixture.teamName, currentBet)].betScore[0]} - ${currentBet[indexOfBet(fixture.teamName, currentBet)].betScore[1]}`}
                            </div>
                            <button type='button' id={`${day}${i}-bet`} className='bet_button btn' onClick={openUpdateBet}>UPDATE BET</button>
                            <button type='button' id={`${day}${i}-delete`} className='bet_button delete_button btn btn-sm' onClick={openDeleteBet}>DELETE BET</button>
                            </div>) : <button type='button' id={`${day}${i}-bet`} className='bet_button btn' onClick={openBet}>BET</button>}
                        </div>
                        <div className='match_team_info col-3'>
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
                    {(disArr[0] === '') ? (<><button type='button' className='sat_button btn col-5 active' onClick={showSat}><b>Saturday {getMatchDates()[0]}</b></button>
                        <button type='button' className='sun_button btn col-5' onClick={showSun}><b>Sunday {getMatchDates()[1]}</b></button></>) : (<><button type='button' className='sat_button btn col-5' onClick={showSat}><b>Saturday {getMatchDates()[0]}</b></button>
                            <button type='button' className='sun_button btn col-5 active' onClick={showSun}><b>Sunday {getMatchDates()[1]}</b></button></>)}
                </div>
                <div className='home_match_wrapper row'>
                    {(stateSelector.loading) ? null : <>
                        {(disArr[0] === '') ? matchDiv(0) : null}

                        {(disArr[1] === '') ? matchDiv(1) : null}
                    </>}

                </div>
            </div>

            <div className="modal" id='betOnMatch' tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header row">
                            <h5 className="modal-title col-9">Bet On Match</h5>
                            <button type="button" onClick={handleClose} className="close col-3" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row">
                            <div className="input-group input-group-sm modal_team_name1 mb-3 col-6">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >{teamArr[0]}</span>
                                </div>
                                <input type="number" value={betScore[0]} onChange={(e) => changeBetScore([e.target.value, betScore[1]])} className="form-control" aria-label="team 1" placeholder='0' aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm modal_team_name2 mb-3 col-6">
                                <input type="number" value={betScore[1]} onChange={(e) => changeBetScore([betScore[0], e.target.value])} className="form-control" placeholder="0" aria-label="team 2" aria-describedby="inputGroup-sizing-sm" />
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">{teamArr[1]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleBet} className="btn modal_bet_button">BET</button>
                            <button type="button" onClick={handleClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal" id='updateBetOnMatch' tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header row">
                            <h5 className="modal-title col-9">Update Bet On Match</h5>
                            <button type="button" onClick={handleClose} className="close col-3" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row">
                            <div className="input-group input-group-sm modal_team_name1 mb-3 col-6">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >{teamArr[0]}</span>
                                </div>
                                <input type="number" value={betScore[0]} onChange={(e) => changeBetScore([e.target.value, betScore[1]])} className="form-control" aria-label="team 1" placeholder='0' aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm modal_team_name2 mb-3 col-6">
                                <input type="number" value={betScore[1]} onChange={(e) => changeBetScore([betScore[0], e.target.value])} className="form-control" placeholder="0" aria-label="team 2" aria-describedby="inputGroup-sizing-sm" />
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">{teamArr[1]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleUpdateBet} className="btn modal_bet_button">BET</button>
                            <button type="button" onClick={handleClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal" id='deleteBetOnMatch' tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header row">
                            <h5 className="modal-title col-9">Delete Bet On Match</h5>
                            <button type="button" onClick={handleClose} className="close col-3" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row">
                            {`Want to delete bet on ${teamArr[0]} vs ${teamArr[1]}?`}
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleDeleteBet} className="btn modal_bet_button">DELETE</button>
                            <button type="button" onClick={handleClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;