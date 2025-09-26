import { useState } from "react";
import GameBoard from "./GameBoard";
import StartScreen from "./StartScreen";
export default function Main() {
  const [started, setStarted] = useState(false);

  return <>{started ? <GameBoard /> : <StartScreen onStart={() => setStarted(true)} />}</>;
}
