import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetch('https://itunes.apple.com/search?term=new+york&media=podcast')
      .then(r => r.json())
      .then((rJson) => {
        console.log(rJson.results.map((el) => {
          return {
            name: el.artistName,
            feed: el.feedUrl,
            artwork: el.artworkUrl600,
          };
        }));
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>HI :D</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
