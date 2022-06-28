import Head from 'next/head';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Results from '../components/Results';
import { fetchMovies } from '../utils/requests';

export default function Home({results}) {
  return (
    <div>
      <Head>
        <title>Tv Streaming App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const fetchDetails = genre
    ? fetchMovies[genre].url
    : fetchMovies.fetchTrending.url;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      fetchDetails
    }`
  );

  const data = await request.json();

  return {
    props: {
      results: data.results
    }
  };
}
