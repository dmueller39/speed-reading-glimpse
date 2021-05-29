// @flow
import React, { useState } from "react";

import type {
  SpeedReadingGlimpseGameResult,
  SpeedReadingGlimpseGame,
} from "./types";
import { getSpeedReadingGlimpsePlan } from "./gameLogic";
import Level from "./Level";
import Menu from "./Menu";

import type { StackNavigationProp, RouteProp } from "@react-navigation/stack";

const OPTIONS = [2, 3, 4, 5, 6, 7].map((value) => {
  return {
    name: "" + value,
    getGamePlan: () => getSpeedReadingGlimpsePlan(value),
  };
});

export default function SpeedReadingGlimpse() {
  const [game, setGame] = useState((null: ?SpeedReadingGlimpseGame));
  if (game == null) {
    return <Menu options={OPTIONS} setGame={setGame} />;
  } else {
    const onComplete = (result: SpeedReadingGlimpseGameResult) => {
      window.location.href = window.location.href.split("#")[0] + "#complete=1";
      setGame(null);
    };

    return <Level game={game} onComplete={onComplete} />;
  }
}
