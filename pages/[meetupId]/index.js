import MeetupDetail from "../../components/meetups/MeetupDetail";
import Meetup from "../../models/meetup";
import Head from 'next/head';

function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name='description' content={props.address + ' ' + props.title + ' ' + props.description} />
            </Head>
            <MeetupDetail image={props.image} alt={props.alt} title={props.title} address={props.address} description={props.description} />
        </>
    );
}

//while using dynamic page rendering with getStaticProps() we need to use getStaticPaths() to tell nextjs which parameter in the url (localhost:4000/m1) will be valid if any user type something in the url, and with the help of getStaticProps we can fetch data via url parameter input from database and render something in page
export async function getStaticPaths() {

    const meetups = await Meetup.find({}, { _id: 1 }); //means only fetching id

    const parameters = meetups.map((meetup) => {
        return {
            params: { meetupId: meetup._id.toString() }
        }
    })
    return {
        paths: parameters, //because this parameters is an array where every params.meetupId will be unique because of mapping
        fallback: 'blocking' //means if any dynamic page added after deployment and nextjs auto revalidate the site then if we immediately visit that newly generated page nextjs will not respond with 404 error anymore it will pre-generate the newly added page, so we are telling nextjs that there might be some other valid roots (pages) we can access or visit (means the root (pages) have some data)
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    // here we need to convert the meetupId to new ObjectId(meetupId) to actually make it same as in the database, but i think while using mongoose, mongoose automatically ignore the new ObjectId part and search for real id, means if a document has id named new ObjectId('23423dsdds4dfdsf224') then mongoose will take only this '23423dsdds4dfdsf224'. so, here we are not coverting it maybe mongoose knows that it should take the real id only and ignore the new ObjectId
    const currentMeetup = JSON.parse(JSON.stringify(await Meetup.findById(meetupId)));

    //if we convert the id then it will be like this (note that mongoose should be imported to use mongoose.Types.ObjectId)
    // const foundMeetup = await Meetup.findById(mongoose.Types.ObjectId(meetupId));

    // const currentMeetup = JSON.parse(JSON.stringify(foundMeetup));

    return {
        props: {
            id: currentMeetup._id,
            title: currentMeetup.title,
            image: currentMeetup.image,
            alt: currentMeetup.title,
            address: currentMeetup.address,
            description: currentMeetup.description
        }
    }
}

export default MeetupDetails;