import React from "react";
const LogIn = () => {
    return (
        <div className="p-5">
            <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
            </div>
            <form className="user">
                <div className="m-3">Log in to create tour own test</div>
                <a
                    href="/auth/google"
                    className="btn btn-google btn-user btn-block"
                >
                    <i className="fab fa-google fa-fw"></i> Login with Google
                </a>
                {/* <a
                    href="index.html"
                    className="btn btn-facebook btn-user btn-block"
                >
                    <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                </a> */}
                <a
                    href="/auth/logout"
                    className="btn btn-secondary btn-user btn-block"
                >
                    Log out
                </a>
            </form>
        </div>
    );
};

export default LogIn;
