import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private uri : string;
    private count = 0;
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    };

    constructor() {
        this.uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.oby0lcp.mongodb.net/?retryWrites=true&w=majority`;
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    public connectWithRetry() {
        log('Attempting MongoDB connection (will retry if needed)');

        mongoose
            .connect(this.uri, this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                );
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
}

export default new MongooseService();