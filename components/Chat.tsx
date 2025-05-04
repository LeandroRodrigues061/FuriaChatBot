import { useEffect, useState, useMemo, useRef } from "react";
import { questions as originalQuestions } from "../data/questions";
import ChatBubble from "./ChatBubble";
import Link from "next/link";
import Header from "./Header01";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/pages/firebaseConfig";

type Message = {
  from: "bot" | "user";
  text: string;
};

type RankingEntry = {
  name: string;
  score: number;
  date: string;
};

type Question = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: "easy" | "hard";
};

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function Chat() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "hard" | null>(null);
  const filteredQuestions = useMemo(() => {
    if (selectedDifficulty) {
      return (originalQuestions as Question[]).filter(q => q.difficulty === selectedDifficulty);
    }
    return originalQuestions as Question[];
  }, [originalQuestions, selectedDifficulty]);

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const [currentShuffledOptions, setCurrentShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDifficulty) {
      const shuffled = shuffleArray(filteredQuestions);
      setShuffledQuestions(shuffled);
      setCurrentQuestion(0);
      setScore(0);
      setIsFinished(false);
      setMessages([
        { from: "bot", text: "Salve! Preparado pro quiz da FURIA? Bora lá!" },
        { from: "bot", text: shuffled[0]?.question ?? "Pergunta indisponível." },
      ]);
    } else {
      setShuffledQuestions([]);
      setMessages([{ from: "bot", text: "Salve! Preparado pro quiz da FURIA? Bora lá!" }]);
    }
  }, [filteredQuestions, selectedDifficulty]);

  useEffect(() => {
    if (shuffledQuestions.length > 0 && currentQuestion < shuffledQuestions.length) {
      const currentQ = shuffledQuestions[currentQuestion];
      const allOptions = shuffleArray([currentQ.correctAnswer, ...currentQ.incorrectAnswers]);
      setCurrentShuffledOptions(allOptions);
    } else {
      setCurrentShuffledOptions([]);
    }
  }, [shuffledQuestions, currentQuestion]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAnswer = (selectedOption: string) => {
    if (!selectedDifficulty || isFinished || !shuffledQuestions.length) return;

    const currentQ = shuffledQuestions[currentQuestion];
    const correct = selectedOption === currentQ.correctAnswer;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: selectedOption },
      {
        from: "bot",
        text: correct
          ? "✅ Boa, acertou!"
          : `❌ Errou! Resposta certa: ${currentQ.correctAnswer ?? "Desconhecida"}`,
      },
    ]);

    if (correct) setScore((prev) => prev + 1);

    const nextIndex = currentQuestion + 1;

    if (nextIndex >= shuffledQuestions.length) {
      setTimeout(() => {
        setIsFinished(true);
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: `🎉 Fim do quiz! Sua pontuação: ${score + (correct ? 1 : 0)} de ${shuffledQuestions.length}`,
          },
        ]);
      }, 1000);
      return;
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: shuffledQuestions[nextIndex]?.question ?? "Pergunta indisponível." },
      ]);
      setCurrentQuestion(nextIndex);
    }, 1000);
  };

  return (
    <>
      <Header />
      {!selectedDifficulty ? (
        <div className="max-w-xl mx-auto p-4 bg-black text-white min-h-[800px] flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">Selecione a dificuldade do Quiz:</h2>
          <div className="space-x-4">
            <button
              onClick={() => setSelectedDifficulty("easy")}
              className="bg-black text-white border-2 border-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
            >
              Fácil
            </button>
            <button
              onClick={() => setSelectedDifficulty("hard")}
              className="bg-black text-white border-2 border-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
            >
              Difícil
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto p-4 bg-black text-white min-h-[800px]">
          <div className="space-y-2 mb-4 overflow-y-auto max-h-[700px] " ref={chatContainerRef} >
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg.text} from={msg.from} />
            ))}
          </div>

          {!isFinished && shuffledQuestions.length > 0 && currentShuffledOptions.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {currentShuffledOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="bg-transparent border-2 font-semibold py-2 px-4 rounded-xl hover:bg-furyYellow hover:opacity-50 transition cursor-pointer"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {isFinished && !scoreSaved && shuffledQuestions.length > 0 && (
            <div className="mt-4 space-y-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full p-2 rounded text-white border-gray-400 border-2"
              />
              <button
                className="bg-yellow-500 text-black w-full py-2 rounded cursor-pointer"
                onClick={async () => {
                  if (playerName.trim()) {
                    const trimmedName = playerName.trim();
                    setPlayerName(trimmedName);

                    const newEntry: RankingEntry = {
                      name: trimmedName,
                      score,
                      date: new Date().toLocaleDateString(),
                    };

                    try {
                      await addDoc(collection(db, "ranking"), newEntry);
                      setScoreSaved(true);
                    } catch (error) {
                      console.error("Erro ao salvar no Firestore:", error);
                      alert("Erro ao salvar pontuação. Tente novamente.");
                    }
                  }
                }}
              >
                Salvar no ranking
              </button>
            </div>
          )}

          {scoreSaved && (
            <Link
              href="/ranking"
              className="inline-block mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              Ver ranking
            </Link>
          )}
        </div>
      )}
    </>
  );
}
