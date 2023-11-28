import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://omarnerou:56831307$yr@cluster0.rk7y3gn.mongodb.net/meetups?retryWrites=true&w=majority',
    );
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne(data);

    client.close();
    res.status(201).json({ message: 'Meetup inserted' });
  }
}

export default handler;
