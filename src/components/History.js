import React from 'react';
import './History.css';
import { useSelector } from 'react-redux';

function History() {

    const stateSelector = useSelector(state => state.bet);
    let betHistory = stateSelector.userData.betData.betHistory;  
    let betHistoryArr = [
        {
            "gameDate": "2022-01-22T00:00:00.000Z",
            "points": 5,
            "_id": "61ecaaad628b1a666758139b",
            "teams": [
                "Everton",
                "Aston Villa"
            ],
            "betScore": [
                0,
                1
            ],
            "actualScore": [
                "0",
                "1"
            ]
        },
        {
            "gameDate": "2022-01-22T00:00:00.000Z",
            "points": 5,
            "_id": "61ecaaad628b1a666758139c",
            "teams": [
                "Brentford",
                "Wolverhampton Wanderers"
            ],
            "betScore": [
                1,
                2
            ],
            "actualScore": [
                "1",
                "2"
            ]
        },
        {
            "gameDate": "2022-01-22T00:00:00.000Z",
            "points": 0,
            "_id": "61ecaaad628b1a666758139d",
            "teams": [
                "Leeds United",
                "Newcastle United"
            ],
            "betScore": [
                8,
                8
            ],
            "actualScore": [
                "0",
                "1"
            ]
        },
        {
            "gameDate": "2022-01-22T00:00:00.000Z",
            "points": 2,
            "_id": "61ecaaad628b1a666758139e",
            "teams": [
                "Manchester United",
                "West Ham United"
            ],
            "betScore": [
                5,
                0
            ],
            "actualScore": [
                "1",
                "0"
            ]
        },
        {
            "gameDate": "2022-01-23T00:00:00.000Z",
            "points": 0,
            "_id": "61f0cb27ccb9d096e04771d3",
            "teams": [
                "Arsenal",
                "Burnley"
            ],
            "betScore": [
                3,
                1
            ],
            "actualScore": [
                "0",
                "0"
            ]
        },
        {
            "gameDate": "2022-01-23T00:00:00.000Z",
            "points": 2,
            "_id": "61f0cb27ccb9d096e04771d4",
            "teams": [
                "Crystal Palace",
                "Liverpool"
            ],
            "betScore": [
                1,
                4
            ],
            "actualScore": [
                "1",
                "3"
            ]
        }
    ];
    
    function groupArr(betArr) {
        let arr = [];
        for(let i=0; i<betArr.length; i++) {
            if(arr.length===0 || arr[arr.length-1].date !==betArr[i].gameDate) {
                let obj = {};
                obj.date = betArr[i].gameDate;
                obj.matchArr = [{
                    teams: betArr[i].teams,
                    betScore: betArr[i].betScore,
                    actualScore: betArr[i].actualScore,
                    points: betArr[i].points
                }];
                arr.push(obj);
            }
            else {
                let matchObj = {
                    teams: betArr[i].teams,
                    betScore: betArr[i].betScore,
                    actualScore: betArr[i].actualScore,
                    points: betArr[i].points
                };
                arr[arr.length-1].matchArr.push(matchObj);
            }
        }

        return arr;
    }

    let grpArr = groupArr(betHistory);
    console.log(grpArr);
    
    function historyListDiv(groupArr) {
        console.log(groupArr);
        return groupArr.map((group, i) => {
            return historyDateDiv(group.date, group.matchArr, i);
        })
    }

    function historyDateDiv(date, historyArr, i) {
        console.log(date, historyArr);
        return (
            <div className='history_date_wrapper row' key={`${i}-history-grp`}>
                <div className='history_date row'>
                    {date}
                </div>
                {historyArr.map((history, i) => {
                    return (
                        historyDiv(history,i)
                    )
                })}
            </div>
        )
    } 

    function historyDiv(historyObj, i) {
        console.log(historyObj);
        return (
            <div className='history_match_wrapper row' key ={`${i}-history`}>
                <div className='history_teams col-12'>
                    {`${historyObj.teams[0]} vs ${historyObj.teams[1]}`}
                </div>
                <div className='history_prediction_text col-6'>
                    Your Prediction:
                </div>
                <div className='history_prediction_score col-6'>
                    {`${historyObj.betScore[0]} : ${historyObj.betScore[1]}`}
                </div>
                <div className='history_actual_text col-6'>
                    Actual Score:
                </div>
                <div className='history_actual_score col-6'>
                    {`${historyObj.actualScore[0]} : ${historyObj.actualScore[1]}`}
                </div>
                <div className='history_points_text col-6'>
                    Points Won:
                </div>
                <div className='history_points col-6'>
                    {`${historyObj.points} `} {thumb(historyObj.points)}
                </div>
            </div>
        )
    }

    function thumb(points) {
        if(points===5) return (
            <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        )
        else if(points===2) return (
            <i class="fa fa-meh-o" aria-hidden="true"></i>
        )
        else if(points===0) return (
            <i class="fa fa-thumbs-down" aria-hidden="true"></i>
        )
    }
    return (
        <div className='history container'>
            <div className='history_row row'>
                <div className='history_header row'>
                    <div className='history_header_title col-12'>
                        BET HISTORY
                    </div>
                </div>
                <div className='history_wrapper row'>
                   {historyListDiv(grpArr)}
                </div>
            </div>
        </div>
    )
}

export default History;