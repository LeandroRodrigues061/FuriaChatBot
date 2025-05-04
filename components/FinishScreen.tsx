import { useRouter } from "next/router";

interface FinishScreenProps {
  score: number;
  total: number;
}

export default function FinishScreen({ score, total }: FinishScreenProps) {
  const router = useRouter();

  const handleViewRanking = () => {
    router.push('/ranking');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
      <h1 className="text-3xl font-bold text-white">Parabéns!</h1>
      <p className="text-lg text-gray-300">
        Você completou o quiz! Acertou {score} de {total} perguntas.
      </p>
      <button
        onClick={handleViewRanking}
        className="mt-6 px-5 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-xl transition cursor-pointer"
      >
        Ver Ranking
      </button>
    </div>
  );
}
