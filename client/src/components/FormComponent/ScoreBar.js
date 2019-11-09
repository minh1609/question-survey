import React from "react";

const ScoreBar = ({ score, totalQuestion }) => {
    let percentage = Math.round((score / totalQuestion) * 100);

    const barColor = () => {
        if (percentage < 50) return "bg-danger";
        else if (percentage < 80) return "bg-primary";
        else return "bg-success";
    };

    return (
        <React.Fragment>
            <strong>{percentage}%</strong>
            <div class="progress my-4">
                <div
                    class={"progress-bar " + barColor()}
                    role="progressbar"
                    style={{ width: percentage + "%" }}
                ></div>
            </div>
        </React.Fragment>
    );
};

export default ScoreBar;
