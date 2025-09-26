import { useEffect, useState } from "react";
import Bottle from "./Bottle";

function generateRandomBottles() {
  const colors = [
    "pink",
    "red",
    "green",
    "blue",
    "black",
    "cyan",
    "purple",
    "white",
    "brown",
  ];

  const selectedColors = colors.sort(() => Math.random() - 0.5).slice(0, 4);

  const liquidPool = [];
  const bottles = [];
  selectedColors.forEach((c) => {
    for (let i = 0; i < 4; i++) {
      liquidPool.push(c);
    }
  });

  for (let i = liquidPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [liquidPool[i], liquidPool[j]] = [liquidPool[j], liquidPool[i]];
  }

  for (let index = 0; index < 4; index++) {
    bottles.push(liquidPool.slice(index * 4, (index + 1) * 4));
  }
  bottles.push([]);
  bottles.push([]);
  console.log(bottles);
  return bottles;
}

export default function GameBoard() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedBottleIndex, setSelectedBottleIndex] = useState(null);
  const [bottles, setBottles] = useState(generateRandomBottles());

  useEffect(() => {
    const completedBottles = bottles.filter(
      (b) => b.length === 4 && new Set(b).size === 1
    );
    if (completedBottles.length >= 4 && !isGameOver) {
      alert("You Won The Game");
      setIsGameOver(true);
    }
  }, [isGameOver, bottles]);

  function handleClickBottle(index) {
    if (isGameOver) return;
    const clickedBottle = bottles[index];
    if (selectedBottleIndex === null) {
      if (clickedBottle.length === 0) return;
      setSelectedBottleIndex(index);
      return;
    }
    if (index === selectedBottleIndex) {
      setSelectedBottleIndex(null);

      return;
    }
    const newBottles = bottles.map((b) => [...b]);
    const fromBottle = newBottles[selectedBottleIndex];
    const toBottle = newBottles[index];

    if (fromBottle.length !== 0 && toBottle.length < 4) {
      const movingColor = fromBottle[fromBottle.length - 1];
      if (
        toBottle.length === 0 ||
        movingColor === toBottle[toBottle.length - 1]
      ) {
        toBottle.push(fromBottle.pop());
      }
    }
    setBottles(newBottles);
    setSelectedBottleIndex(null);
  }

  return (
    <>
      <div className="container">
        {bottles.map((colors, index) => {
          return (
            <Bottle
              isSelected={index === selectedBottleIndex}
              onClick={(e) => handleClickBottle(index)}
              colors={colors}
            />
          );
        })}
      </div>
    </>
  );
}
