import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "components/Footer";
import SearchBar from "components/UtilitiesComponent/SearchBar";

import { fetchQuestions } from "../../actions";

const Home = ({ history }) => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questionsSets);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    const redirect = id => {
        history.push(`/questionset/${id}`);
    };

    const renderQuestionList = () => {
        return questions.map(e => (
            <div key={e._id} className="col-sm-12 col-lg-6">
                <div
                    className="card shadow mb-4"
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    <div
                        className="card-header py-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => redirect(e._id)}
                    >
                        <h6 className="m-0 font-weight-bold text-primary">
                            {e.name}
                        </h6>
                    </div>
                    <div className="card-body">{e.description}</div>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <SearchBar />
            {auth && ( //only render button if user is log in
                <button
                    className="btn btn-success shadow p-2 mb-2 "
                    onClick={() => {
                        history.push("/create/questionset");
                    }}
                >
                    Build your own Test
                </button>
            )}
            <br />
            <i className="my-1">Sample Test</i>

            <div className="row" style={{ marginBottom: "80px" }}>
                {renderQuestionList()}
            </div>
            <Footer />
        </div>
    );
};

export default Home;
