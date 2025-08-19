import { useState } from "react";

function App() {
  const [mode, setMode] = useState(null); // 1: friend, 2: computer
  const [round, setRound] = useState(0);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [score, setScore] = useState({
    p1Wins: 0,
    p2Wins: 0,
    draws: 0,
  });
  const [message, setMessage] = useState("");

  const choices = ["Rock", "Paper", "Scissors"];

  const playRound = (p1Choice, p2Choice) => {
    setPlayer1(p1Choice);
    setPlayer2(p2Choice);

    if (p1Choice === p2Choice) {
      setMessage("Draw!");
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (p1Choice === 0 && p2Choice === 2) ||
      (p1Choice === 1 && p2Choice === 0) ||
      (p1Choice === 2 && p2Choice === 1)
    ) {
      setMessage("Player 1 Wins!");
      setScore((prev) => ({ ...prev, p1Wins: prev.p1Wins + 1 }));
    } else {
      setMessage(mode === 1 ? "Player 2 Wins!" : "Computer Wins!");
      setScore((prev) => ({ ...prev, p2Wins: prev.p2Wins + 1 }));
    }

    setRound(round + 1);
  };

  const resetGame = () => {
    setRound(0);
    setPlayer1(null);
    setPlayer2(null);
    setScore({ p1Wins: 0, p2Wins: 0, draws: 0 });
    setMessage("");
    setMode(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-purple-300 p-6">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-6">
        Rock Paper Scissors 🎮
      </h1>

      {!mode && (
        <div className="flex gap-6">
          <button
            onClick={() => setMode(1)}
            className="px-6 py-3 bg-indigo-800 text-white rounded-lg hover:bg-indigo-900 transition"
          >
            Play with Friend
          </button>
          <button
            onClick={() => setMode(2)}
            className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          >
            Play with Computer
          </button>
        </div>
      )}

      {mode && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-center mb-4">
            {mode === 1 ? "Friend Mode" : "Computer Mode"}
          </h2>

          <div className="flex justify-around mb-6">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() =>
                  playRound(
                    index,
                    mode === 1
                      ? window.prompt("Enter Player 2 choice (0=Rock, 1=Paper, 2=Scissors)") * 1
                      : Math.floor(Math.random() * 3)
                  )
                }
                className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-900 transition"
              >
                {choice}
              </button>
            ))}
          </div>

          {message && (
            <div className="text-center font-semibold text-lg text-purple-800 mb-4">
              {message}
            </div>
          )}

          <div className="text-center space-y-1">
            <p>Player 1 Choice: {player1 !== null ? choices[player1] : "-"}</p>
            <p>
              {mode === 1 ? "Player 2" : "Computer"} Choice:{" "}
              {player2 !== null ? choices[player2] : "-"}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-center">Scoreboard</h3>
            <p>Player 1 Wins: {score.p1Wins}</p>
            <p>{mode === 1 ? "Player 2" : "Computer"} Wins: {score.p2Wins}</p>
            <p>Draws: {score.draws}</p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Reset Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
