import React, { useEffect, useState } from "react";

const Question = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, []);

    const renderOption = () => {
        return data.option.map(e => (
            <div class="col-xl-3 col-md-6 mb-2">
                <div class="card">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">{e}</div>
                            <div class="col-auto">
                                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div class="card shadow mb-4 border-left-primary">
            <div class="card-header">{data.question}</div>
            <div class="card-body row">{renderOption()}</div>
        </div>
    );
};

export default Question;
