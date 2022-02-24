import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "components/Footer";
import SearchBar from "components/UtilitiesComponent/SearchBar";
import FilterButtons from "components/UtilitiesComponent/FilterButtons";

import { fetchQuestions } from "../../actions";

const Home = ({ history }) => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questionsSets);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    const redirectToQuestionSetPage = (id) => {
        history.push(`/questionset/${id}`);
    };

    const renderQuestionList = () => {
        return questions.map((e) => (
            <div key={e._id} className="col-sm-12 col-lg-6">
                <div
                    className="card shadow mb-4"
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    <div
                        className="card-header py-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => redirectToQuestionSetPage(e._id)}
                    >
                        <h6 className="m-0 font-weight-bold text-primary">
                            {e.name}
                        </h6>
                        <h7 className="m-0 font-weight-light font-italic">
                            {e.topic}
                        </h7>
                    </div>
                    <div className="card-body">{e.description}</div>
                </div>
            </div>
        ));
    };

    return (
        <div>
            {auth &&
                auth.role === "admin" && ( //render link to admin page
                    <button
                        className="btn btn-info mb-3"
                        onClick={() => {
                            history.push("/admin");
                        }}
                    >
                        Hi admin, click here to access the admin page
                    </button>
                )}

            <SearchBar />
            <FilterButtons />
            {auth && ( //only render button if user is log in
                <button
                    className="btn btn-success shadow p-2 m-2 "
                    onClick={() => {
                        history.push("/create/questionset");
                    }}
                >
                    Build your own Quiz
                </button>
            )}
            <br />
            <i className="my-1">Sample Quiz</i>

            <div className="row" style={{ marginBottom: "80px" }}>
                {renderQuestionList()}
            </div>
        </div>
    );
};

export default Home;
