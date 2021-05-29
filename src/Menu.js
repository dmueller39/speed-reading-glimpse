// @flow
import * as React from "react";

import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import type {
  SpeedReadingGlimpseGameResult,
  SpeedReadingGlimpseGame,
} from "./types";

import LabelButton from "./common/LabelButton";
import Container from "./common/Container";

export type Props = {|
  options: Array<{ getGamePlan: () => SpeedReadingGlimpseGame, name: string }>,
  setGame: (SpeedReadingGlimpseGame) => void,
|};

export default function Menu({ setGame, options }: Props) {
  const buttons = options.map(({ getGamePlan, name }) => {
    return (
      <LabelButton
        key={name}
        label={name}
        onPress={() => setGame(getGamePlan())}
        type="positive"
        style={styles.labelButton}
      />
    );
  });

  /** todo, only render scrollview on iOS/Android */
  return <Container>{buttons}</Container>;
}

const styles = StyleSheet.create({ labelButton: { alignSelf: "center" } });
