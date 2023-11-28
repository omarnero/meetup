import MeetupList from '@/components/meetups/MeetupList';
import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import React from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups List</title>
        <meta
          title='description'
          content='a list of meta '
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://omarnerou:56831307$yr@cluster0.rk7y3gn.mongodb.net/meetups?retryWrites=true&w=majority',
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}
export default HomePage;
