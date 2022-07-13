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
      window.top.postMessage(window.location.href + " - complete", "*");

      setGame(null);
    };

    return <Level game={game} onComplete={onComplete} />;
  }
}
