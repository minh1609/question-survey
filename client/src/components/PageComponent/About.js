import React from "react";

const About = () => {
    return (
        <div>
            <a
                className="nav-link"
                href="https://github.com/minh1609/question-survey"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-github mr-3"></i>Source Code
            </a>

            <a
                className="nav-link"
                href="https://minh1609.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fas fa-user-alt mr-3"></i> My Portfolio
            </a>
        </div>
    );
};

export default About;
