// import { MongoClient } from "mongodb";
import Meetup from "../../models/meetup";

export default async function handler(req, res) {
    // with mongoDB
    // if (req.method === 'POST') {
    //     const meetpuData = req.body;
    //     const client = await MongoClient.connect('mongodb://localhost:27017/meetupDB');
    //     const db = client.db();

    //     const meetupDB = db.collection('meetups');
    //     const result = await meetupDB.insertOne(meetpuData);
    //     console.log(result);
    //     client.close();

    //     res.json({msg: 'Inserted'});
    // }


    //with mongoose
    if (req.method === 'POST') {
        const meetupData = req.body;
        
        const newMeetupData = new Meetup(meetupData);
        const result = await newMeetupData.save();
        
        res.json({ msg: 'Inserted' });

    }
}