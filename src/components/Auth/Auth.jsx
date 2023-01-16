import React, { Fragment } from "react";
import { provider, auth } from '../../../firebase-config'
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";


const cookies = new Cookies()

const Auth = ({ setIsAuth }) => {

    const signInWithGoogle = async (e) => {
        e.preventDefault()
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('auth-token', result.user.refreshToken)
            setIsAuth(true)
        } catch (error) {
            console.error(error);
        }

       
    }

    return (
        <Fragment>
            <div className="mt-24 text-center">
                <p>Sign In With Google To Continue</p>
                <div className="bg-sky-700 w-fit text-white py-3 px-5 flex justify-center items-center m-auto mt-5">
                    <button onClick={signInWithGoogle}>Sign In With Google</button>
                </div>
            </div>
        </Fragment>
    );
};

export default Auth;
