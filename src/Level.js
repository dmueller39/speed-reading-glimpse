// @flow
import * as React from "react";

import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
  Platform,
  TextInput,
} from "react-native";
import WebKeyboardListener from "./common/WebKeyboardListener";

import type {
  SpeedReadingGlimpseGame,
  SpeedReadingGlimpseGameResult,
} from "./types";
import LabelButton from "./common/LabelButton";
import Container from "./common/Container";

export type Props = {|
  onComplete: (SpeedReadingGlimpseGameResult) => void,
  game: SpeedReadingGlimpseGame,
|};

const PRE_GLIMPSE_SCREEN_TYPE = 1;
const GLIMPSE_SCREEN_TYPE = 2;
const POST_GLIMPSE_SCREEN_TYPE = 3;
const ENTRY_SCREEN_TYPE = 4;
const ANSWER_SCREEN_TYPE = 5;

type ScreenType = 0 | 1 | 2 | 3 | 4 | 5;

type State = {
  currentIndex: number,
  mistakes: number,
  screenType: ScreenType,
  isCorrect: boolean,
  answerText: string,
};

export default class Menu extends React.Component<Props, State> {
  state = {
    currentIndex: 0,
    mistakes: 0,
    screenType: PRE_GLIMPSE_SCREEN_TYPE,
    isCorrect: false,
    answerText: "",
  };

  _timeoutID: ?TimeoutID;
  _didHandleAnswer: boolean = false;

  componentDidMount() {
    this._timeoutID = setTimeout(this._onPreGlimpseTimeout, 1000);
  }

  _onPreGlimpseTimeout = () => {
    this.setState({
      screenType: GLIMPSE_SCREEN_TYPE,
    });
    this._timeoutID = setTimeout(this._onGlimpseTimeout, 200);
  };

  _onGlimpseTimeout = () => {
    this.setState({
      screenType: POST_GLIMPSE_SCREEN_TYPE,
    });
    this._timeoutID = setTimeout(this._onPostGlimpseTimeout, 1000);
  };

  _onPostGlimpseTimeout = () => {
    this._didHandleAnswer = false;
    this.setState({
      screenType: ENTRY_SCREEN_TYPE,
    });
  };

  confirmAnswer = () => {
    // handle race conditions that setState can't help with
    if (!this._didHandleAnswer) {
      this._didHandleAnswer = true;
      const isCorrect =
        this.state.answerText.toLowerCase() ===
        this.props.game.turns[this.state.currentIndex].toLowerCase();
      const mistakes = this.state.mistakes + (isCorrect ? 0 : 1);
      this.setState({
        mistakes,
        screenType: ANSWER_SCREEN_TYPE,
        isCorrect,
      });
    }
  };

  _onChangeAnswerText = (answerText: string) => {
    this.setState({ answerText });
  };

  _onKeyPress = ({
    nativeEvent: { key },
  }: {
    nativeEvent: { key: string },
  }) => {
    if (key == "Enter") {
      this.confirmAnswer();
    }
  };

  _onBlur = () => {
    if (
      this.state.answerText.length > 0 &&
      // we also blur when we hit enter
      this.state.screenType == ENTRY_SCREEN_TYPE
    ) {
      this.confirmAnswer();
    }
  };

  continueGame = () => {
    const currentIndex = this.state.currentIndex + 1;
    const mistakes = this.state.mistakes;
    if (currentIndex >= this.props.game.turns.length) {
      this.props.onComplete({
        mistakes,
        length: this.props.game.turns.length,
      });
    } else {
      this.setState({
        answerText: "",
        currentIndex,
        isCorrect: false,
        screenType: PRE_GLIMPSE_SCREEN_TYPE,
      });
      this._timeoutID = setTimeout(this._onPreGlimpseTimeout, 1000);
    }
  };

  _renderIcon = () => {
    if (this.state.screenType != ANSWER_SCREEN_TYPE) {
      return null;
    }
    if (this.state.isCorrect) {
      return <Text style={styles.answerText}>✅</Text>;
    }
    return <Text style={styles.answerText}>🚫</Text>;
  };

  render() {
    const isLast = this.state.currentIndex + 1 >= this.props.game.turns.length;

    switch (this.state.screenType) {
      case 1:
        return <Container></Container>;
      case 2:
        return (
          <Container>
            <Text style={styles.word}>
              {this.props.game.turns[this.state.currentIndex]}
            </Text>
          </Container>
        );
      case 3:
        return <Container></Container>;
      case 4:
        return (
          <Container>
            <View style={styles.answerContainer}>
              <TextInput
                autoFocus={true}
                autoCapitalize="none"
                onChangeText={this._onChangeAnswerText}
                onKeyPress={this._onKeyPress}
                style={styles.textInput}
                onBlur={this._onBlur}
              />
            </View>
          </Container>
        );
      case 5:
        return (
          <Container>
            <View style={styles.answerContainer}>{this._renderIcon()}</View>
            <Text style={{ textAlign: "center" }}>
              {this.state.answerText.toLowerCase()} /{" "}
              {this.props.game.turns[this.state.currentIndex].toLowerCase()}
            </Text>
            <LabelButton
              style={{ textAlign: "center" }}
              label={isLast ? "finish" : "next"}
              onPress={() => this.continueGame()}
              type="positive"
            />
          </Container>
        );
      default:
        return <Container></Container>;
    }
  }
}

const styles = StyleSheet.create({
  compareContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  word: {
    width: "100%",
    textAlign: "center",
    fontSize: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  hContainer: {
    flexDirection: "row",
    padding: 8,
    margin: "auto",
    width: "100%",
    justifyContent: "center",
  },
  inputContainer: {
    alignItems: "center",
  },
  answerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  answerText: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 40,
  },
  textInput: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 40,
    backgroundColor: "white",
    textAlign: "center",
  },
});
