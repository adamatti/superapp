import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { isAuthenticated, loginWithPopup } = useAuth0();

    return (
        <>
            {!isAuthenticated && (
                <button
                    onClick={async () => {
                        await loginWithPopup();
                    }}
                >
                    Log In
                </button>
            )}
        </>
    );
};

export default LoginButton;
