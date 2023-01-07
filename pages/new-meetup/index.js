import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';


function NewMeetUpPage() {
    const router = useRouter();

    async function addMeetupHandler(meetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meetupData)
        });

        const data = await response.json();
        console.log(data);
        router.replace('/');
    }


    return (
        <>
            <Head>
                <title>Add your favourite place</title>
                <meta name='description' content='Add your favourite place details easily' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
}

export default NewMeetUpPage;