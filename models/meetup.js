require('dotenv').config();
import mongoose from "mongoose";

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL);

const meetupSchema = new mongoose.Schema({
    title: String,
    image: String,
    address: String,
    description: String
});

//This expression means if the model exists then use it else create it (got this answer from online reference that in NextJs if we try to add more data in a same collection like here Meetup, it gives error that it will not overwrite the current model, so this expression have to use here, which is create it or use it);
const Meetup = mongoose.models.Meetup || mongoose.model('Meetup', meetupSchema);

export default Meetup;