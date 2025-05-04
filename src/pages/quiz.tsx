import Chat from '../../components/Chat';
import Head from 'next/head';


export default function Quiz() {
    return(
        <>
        <Head>
        <title>Quiz da FURIA</title>
        <meta name="description" content="Mostre que você é o maior fã da FURIA neste quiz!" />
      </Head>
      <Chat/>;
        </>
    )
}