import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import auth from './FirebaseConfig';
import { createUserWithEmailAndPassword, signOut, sendEmailVerification, } from 'firebase/auth';

function SignUp() {
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const [valid, isValid] = useState(null);

    const signUp = (e) => {

        e.preventDefault();

        if (valid) return;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                let user = auth.currentUser;
                sendEmailVerification(user)
                    .then(() => {
                        signOut(auth);
                        alert(`Verification link sent to ${email}. \n Please click on the link to verify your email and log into your acount.`);
                        isValid(true);
                        document.getElementById("signup").click();
                    }).catch(e => {
                        alert(e)
                    })
            }).catch(e => alert(e.message))
    }

    return (
        <div className="sign_up row">
            <div className="sign_up_form col-sm-5">
                <form>
                    <h4>Sign Up For Soccer Bet</h4>
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
                    <br/>
                    <button type="submit" onClick={signUp} className="sign_up_button btn">
                        <Link to={(valid) ? "/" : "/signup"} className="signUp_link" id="signup">
                            Sign Up <i className="fa fa-user-plus"></i>
                        </Link>
                    </button>
                    <br /><br />
                    <div>
                        <Link to="/">
                            <a>Existing user? Sign in here.</a>
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
}

export default SignUp;