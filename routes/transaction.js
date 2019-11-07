import mongoose from "mongoose"

const transaction = (session = mongoose.startSession()) => {
    session.startTransaction();
    try {
        const opts = { session };

        await session.commitTransaction();
        res.status(201).send({ message: "Success" });
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).send(error);
    }
}

export default transaction