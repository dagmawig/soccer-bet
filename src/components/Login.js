import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import auth from './FirebaseConfig';
import { signInWithEmailAndPassword, signOut, sendEmailVerification, } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserID } from './betSlice';

function Login() {

    const dispatch = useDispatch();
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                let user = auth.currentUser;
                if (user.emailVerified) {
                    localStorage.setItem("soccerBet_userID", user.uid);
                    localStorage.setItem("email", email);
                    dispatch(setUserID(user.uid));

                    window.location.reload();
                }
                else {
                    sendEmailVerification(user)
                        .then(() => {
                            signOut(auth);
                            alert(`Verification link sent to ${email}. \n Please click on the link to verify your email and log into your acount.`);
                        }).catch(e => {
                            alert(e)
                        })
                }
            }).catch((e) => alert(e.message));
    }

    return (
        <div className="login row">
            <div className="login_form col-sm-5">
                <form>
                    <h4>Welcome To Soccer Bet</h4>
                    <br />
                    <div className="form-group">
                        <label for="email"><b>Email</b></label>
                        <input type="email" className="form-control" placeholder="email" size="22" onChange={(e) => getEmail(e.target.value)}></input>
                    </div>
                    <br />
                    <div className="form-group">
                        <label for="password"><b>Password</b></label>
                        <input type="password" className="form-control " placeholder="password" size="22" onChange={(e) => getPassword(e.target.value)}></input>
                    </div>

                    <br />
                    <button type="submit" onClick={signIn} className="login_signIn btn">
                        Sign In <i className="fa fa-sign-in"></i>
                    </button>
                    <br /><br />
                    <div>
                        <Link to="/signup">
                            <a>New user? Create account here.</a>
                        </Link>
                    </div>
                    <div>
                        <Link to="/reset">
                            <a>Forgot password? Reset password here.</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;