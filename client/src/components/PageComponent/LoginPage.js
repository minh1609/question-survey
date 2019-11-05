import React from "react";
const LogIn = () => {
    return (
        <div class="p-5">
            <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
            </div>
            <form class="user">
                <a
                    href="/auth/google"
                    class="btn btn-google btn-user btn-block"
                >
                    <i class="fab fa-google fa-fw"></i> Login with Google
                </a>
                {/* <a
                    href="index.html"
                    class="btn btn-facebook btn-user btn-block"
                >
                    <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                </a> */}

                <a
                    href="/auth/logout"
                    class="btn btn-secondary btn-user btn-block"
                >
                    Log out
                </a>
            </form>
        </div>
    );
};

export default LogIn;
