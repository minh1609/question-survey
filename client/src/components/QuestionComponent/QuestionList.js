//Display each question List
import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";

const QuestionList = props => {
    let id = props.match.params.id;
    const [questions, setQuestions] = useState({});

    const fetchData = async () => {
        let data = await axios.get(`/api/question/${id}`);
        setQuestions(data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderEachQuestion = () => {
        try {
            return questions.questions.map(e => (
                <Question key={e._id} data={e} />
            ));
        } catch (error) {}
    };

    return (
        <React.Fragment>
            <div className="mb-4">
                <h3 className="text-gray-800 mb-0">{questions.name}</h3>
                <i>{questions.description}</i>
            </div>
            {renderEachQuestion()}
        </React.Fragment>
    );
};

export default QuestionList;
