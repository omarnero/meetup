import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>git {props.meetupData.title}</title>
        <meta
          title='description'
          content='a single meetup  '
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://omarnerou:56831307$yr@cluster0.rk7y3gn.mongodb.net/meetups?retryWrites=true&w=majority',
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupid: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupid;

  const client = await MongoClient.connect(
    'mongodb+srv://omarnerou:56831307$yr@cluster0.rk7y3gn.mongodb.net/meetups?retryWrites=true&w=majority',
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
        id: selectedMeetup._id.toString(),
      },
    },
  };
}

export default MeetupDetails;
