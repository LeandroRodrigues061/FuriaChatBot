type Props = {
  message: string;
  from: "bot" | "user";
};

export default function ChatBubble({ message, from }: Props) {
  const isUser = from === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      {!isUser && (
        <img
          src="/Furia.png"
          alt="FURIA Bot"
          className="w-10 h-10 mr-2"
        />
      )}

      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] ${
          isUser ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
