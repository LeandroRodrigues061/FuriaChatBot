import { useEffect, useState } from "react";
import Header from "../../components/Header01";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";
import Head from 'next/head';

type RankingEntry = {
  id: string;
  name: string;
  score: number;
  date: string;
};

export default function Ranking() {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const rankingRef = collection(db, "ranking");
        const q = query(rankingRef, orderBy("score", "desc"));
        const querySnapshot = await getDocs(q);

        const entries: RankingEntry[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<RankingEntry, "id">),
        }));

        setRanking(entries);
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <>
    <Head>
        <title>Quiz da FURIA</title>
        <meta name="description" content="Mostre que você é o maior fã da FURIA neste quiz!" />
      </Head>
      <Header />
      <div className="max-w-xl mx-auto p-4 text-white bg-black min-h-[800px]">
        <h2 className="text-2xl font-bold mb-4">🏆 Ranking FURIA</h2>
        {ranking.length === 0 ? (
          <p>Sem jogadores ainda. 😢</p>
        ) : (
          <ul className="space-y-2">
            {ranking.map((entry, index) => (
              <li key={entry.id} className="bg-gray-800 p-2 rounded-xl">
                <strong>{index + 1}. {entry.name}</strong> — {entry.score} pontos
                <span className="block text-sm text-gray-400">{entry.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
