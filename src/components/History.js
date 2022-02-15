import React from 'react';
import './History.css';
import { useSelector } from 'react-redux';

function History() {

    const stateSelector = useSelector(state => state.bet);
    let betHistory = stateSelector.userData.betData.betHistory;
    
    // method to structure history array for display
    function groupArr(betArr) {
        let arr = [];
        for (let i = 0; i < betArr.length; i++) {
            if (arr.length === 0 || arr[arr.length - 1].date !== betArr[i].gameDate) {
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
                arr[arr.length - 1].matchArr.push(matchObj);
            }
        }

        return arr;
    }

    // method to calculate total points won
    function totalP(historyArr) {
        let tot = 0;
        for (let history of historyArr) {
            tot += history.points;
        }
        return tot;
    }

    let grpArr = groupArr(betHistory);

    function historyListDiv(groupArr) {
        return groupArr.map((group, i) => {
            return historyDateDiv(group.date, group.matchArr, i);
        })
    }

    function historyDateDiv(date, historyArr, i) {
        return (
            <div className='history_date_wrapper row' key={`${i}-history-grp`}>
                <div className='history_date row'>
                    {date}
                </div>
                {historyArr.map((history, i) => {
                    return (
                        historyDiv(history, i)
                    )
                })}
            </div>
        )
    }

    function historyDiv(historyObj, i) {
        return (
            <div className='history_match_wrapper row' key={`${i}-history`}>
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
        if (points === 5) return (
            <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        )
        else if (points === 2) return (
            <i class="fa fa-meh-o" aria-hidden="true"></i>
        )
        else if (points === 0) return (
            <i class="fa fa-thumbs-down" aria-hidden="true"></i>
        )
    }
    return (
        <div className='history container'>
            <div className='history_row row'>
                <div className='history_header row'>
                    <div className='history_header_title col-12'>
                        {`BET HISTORY\n`} <br /> {`Total Points: ${totalP(betHistory)}`}
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