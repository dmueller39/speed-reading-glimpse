// @flow
import type { SpeedReadingGlimpseGame } from "./types";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function getCharacter(characters: string) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.substring(randomIndex, randomIndex + 1);
}

function getTurn(letterCount: number) {
  return new Array(letterCount)
    .fill("")
    .map(() => getCharacter(ALPHABET))
    .join("");
}

// game plan for speed reading should be an array of strings.
// the player should see the contents of the string briefly,
// and be asked to copy it
//
// We may eventually want to include meaningful words, but for now just do
// characters
export function getSpeedReadingGlimpsePlan(
  letterCount: number,
  turnCount: number
): SpeedReadingGlimpseGame {
  const turns = new Array(turnCount).fill("").map(() => getTurn(letterCount));
  return {
    turns,
  };
}
