import React from "react";
import axios from "axios";
import {useGoogleLogin} from '@react-oauth/google';
import { API_URL } from '../utils/constants';

function Login () {
    async function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        const auth = await axios.post(`${API_URL}/signin`, {
            googleAccessToken: accessToken
        });
        if (auth.data) {
            localStorage.setItem('token', auth.data.token);
            window.location.reload();
        }
    }
    const login =  useGoogleLogin({
        onSuccess: tokenResponse => handleGoogleLoginSuccess(tokenResponse),
    });

    return (
        <div className="text-center">
            <button onClick={() => login()} style={{padding: '15px', border: '0px none', backgroundColor: '#797389', borderRadius: '.5rem', color:'white', transition: 'all 0.4s'}}>
                Sign in with Google
            </button>
        </div>
    )
};

export default Login;
