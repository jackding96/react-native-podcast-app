import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  componentDidMount() {
    fetch('https://itunes.apple.com/search?term=new+york&media=podcast')
      .then(r => r.json())
      .then((rJson) => {
        rJson.results.map((el) => {
          return {
            name: el.artistName,
            feed: el.feedUrl,
            artwork: el.artworkUrl600,
          };
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          placeholder={'Search a Podcast!'}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputBox: {
    width: "100%",
    height: 40,
    paddingLeft: 20
  }
});
