// @flow
import React, { useState } from "react";

import type {
  SpeedReadingGlimpseGameResult,
  SpeedReadingGlimpseGame,
} from "./types";
import { getSpeedReadingGlimpsePlan } from "./gameLogic";
import Level from "./Level";
import Menu from "./Menu";

const OPTIONS = [2, 3, 4, 5, 6, 7].map((value) => {
  return {
    name: "" + value,
    getGamePlan: () => getSpeedReadingGlimpsePlan(value, 7),
  };
});

export default function SpeedReadingGlimpse() {
  const [game, setGame] = useState((null: ?SpeedReadingGlimpseGame));
  if (game == null) {
    return <Menu options={OPTIONS} setGame={setGame} />;
  } else {
    const onComplete = (result: SpeedReadingGlimpseGameResult) => {
      const inner = {
        ...result,
        letterCount: game == null ? 0 : game.turns[0].length,
      };
      const dataObject = {
        type: "game",
        activitysummary: `${inner.letterCount} letters, ${inner.length} turns`,
        resultsummary: `${inner.length - inner.mistakes} / ${
          inner.length
        } correct`,
        data: JSON.stringify(inner),
      };
      const dataStr = JSON.stringify(dataObject);
      const message = window.location.href + ";complete;" + dataStr;
      window.top.postMessage(message, "*");

      setTimeout(() => setGame(null), 1000);
    };

    return <Level game={game} onComplete={onComplete} />;
  }
}
