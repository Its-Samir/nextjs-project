import MeetupList from '../components/meetups/MeetupList';
import Meetup from '../models/meetup';
import Head from 'next/head';
import { useState } from 'react';
import Loading from '../components/ui/Loading';
// import { MongoClient } from 'mongodb';

// const meetups = [
//   {
//     id: Math.random(),
//     title: 'Meetup 1',
//     image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
//     address: 'some address 4, city',
//     desc: 'This is the first desc for meetup'
//   },
//   {
//     id: Math.random(),
//     title: 'Meetup 2',
//     image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
//     address: 'some address 12, city',
//     desc: 'This is the second desc for meetup'
//   },
//   {
//     id: Math.random(),
//     title: 'Meetup 3',
//     image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
//     address: 'some address 88, city',
//     desc: 'This is the third desc for meetup'
//   },
//   {
//     id: Math.random(),
//     title: 'Meetup 4',
//     image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
//     address: 'some address 7, city',
//     desc: 'This is the fourth desc for meetup'
//   },
// ]

function HomePage(props) {
  const [loading, setLoading] = useState(false);

  const loadingHandler = (isTrue) => {
    setLoading(isTrue);
  }

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='A great way to find best meetups location' />
      </Head>
      {loading ? <Loading /> :
        <MeetupList onLoad={loadingHandler} meetups={props.meetups} />
      }
    </>
  );
}

//through this function we do not need to re-deploy if any dynamic data changes from database because it will pre-render automatically by nextjs
// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: meetups
//     }
//   }
// }

// through this function before pre-rendering any pages, if we fetch some data from database, nextJs first go to this function (can be async means can return Promises) and then executes the rest of the components. MORE: THIS CODE WILL NOT BE SHOWING IN THE CLIENT-SIDE, MEANS WE CAN ALSO USE SOME CREDENTIALS LIKE APIKEY HERE. THIS CODE WILL ONLY EXECUTE WHEN IT PRE-GENERATED MEANS AT THE BUILD TIME
export async function getStaticProps() {

  //we have to import one thing only like if using mongodb then Import MongoClient, otherwise import mongoose, both cannot be imported even one of these is unused, means we cannot keep unnecessary import if that packege is not using by us. (for backend only)
  const meetups = await Meetup.find({});

  //converted because of _id to id (we also change this in the MeetupList Component (key={meetup._id} id={meetup._id}) so do not need to convert here)
  const meetupList = meetups.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      image: meetup.image,
      address: meetup.address
    }
  });

  return {
    props: {
      // we can use this meetups through props inside the above Homepage component
      meetups: JSON.parse(JSON.stringify(meetupList)) //we first stringified it then parsed it because iam using local database (don't know the reason but got from online reference)
    },
    //revalidate helps to re-generate pages if a page have dynamic data and those data changes frequently, so we can set after how much time the page should be re-generate automatically by nextjs
    revalidate: 1 //1 second
  }
}

export default HomePage;