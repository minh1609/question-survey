<h2>Question Set</h2>

            <div class="form-group">
                <label>Question ?</label>
                <input
                    className="form-control"
                    placeholder="Example: Who is president of United State ?"
                />
            </div>

            <div class="form-group">
                <label>Options</label>
                <textarea
                    className="form-control"
                    placeholder="Example: Donald Trump | Donal Duck | Obama"
                />
                <small> Each option are seperated by | symbol</small>
            </div>

            <div class="form-group">
                <label>Answer</label>
                <input className="form-control" placeholder="Example: 0" />
                <small>0 for first option, 1 for second, ...</small>
            </div>
            <button className=" btn btn-secondary">
                Add this question to the set
            </button>
            <br />
            <button className="my-5 p-3 btn btn-primary">
                Finish and Submit
            </button>