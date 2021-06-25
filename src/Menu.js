// @flow
import React, { useState } from "react";

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
  const [showInfo, setShowInfo] = useState(false);

  if (showInfo) {
    const onClosePress = () => setShowInfo(false);
    return (
      <Container>
        <LabelButton
          label="❎"
          onPress={onClosePress}
          type="neutral"
          style={styles.infoButton}
        />
        <Text style={styles.infoText}>
          Select the number of characters you'd like to remember.{"\n"}
          There will be 10 turns.{"\n"}
          Each turn you will be given a brief glimpse of characters to remember.
          {"\n"}
          Retype the characters into the box and hit enter when you are done to
          progress.{"\n"}
        </Text>
      </Container>
    );
  }

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

  const onInfoPress = () => setShowInfo(true);

  return (
    <Container>
      <LabelButton
        label="ℹ️"
        onPress={onInfoPress}
        type="neutral"
        style={styles.infoButton}
      />
      {buttons}
    </Container>
  );
}

const styles = StyleSheet.create({
  infoButton: { right: 5, position: "absolute" },
  infoText: { paddingLeft: 5, paddingRight: 30, paddingTop: 5 },
  labelButton: { alignSelf: "center" },
});
