import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
    <Head>
        <title>Quiz da FURIA</title>
        <meta name="description" content="Mostre que você é o maior fã da FURIA neste quiz!" />
    </Head>
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center">

      <div className="mb-8">
        <img src="/logo-furia.svg" alt="Logo FURIA" className="w-32 h-32 md:w-40 md:h-40 animate-pulse" />
      </div>

      <h1 className="flex text-3xl md:text-4xl font-bold mb-6 text-yellow-500">
        <span className="mr-2">🔥</span> Quiz da Furia<span className="ml-2">🔥</span>
      </h1>

      <p className="mb-8 max-w-xl text-lg text-gray-300">
        Mostre que você é o maior fã da FURIA! Responda perguntas, suba seu ranking e descubra curiosidades insanas sobre o time!
      </p>

      <div className="flex gap-4">
        <Link href='/quiz'>
          <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-md">
            Começar Quiz
          </button>
        </Link>

        <Link href='/ranking'>
          <button className="cursor-pointer border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-md">
            Ver Ranking
          </button>
        </Link>
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-600">
        Feito por um fã para a Família FURIA 🖤
      </footer>

    </div>
    </>
  );
}