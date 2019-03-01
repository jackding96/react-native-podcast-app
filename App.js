import React from 'react';
import { StyleSheet, TextInput, FlatList, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      items: []
    }

    this.search = this.search.bind(this);
  }
  search(searchTerm) {
    this.setState({searchTerm});

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=podcast`)
      .then(r => r.json())
      .then((rJson) => {
        const items = rJson.results.map((el) => {
          return {
            name: el.artistName,
            feed: el.feedUrl,
            artwork: el.artworkUrl600,
          };
        });
        this.setState({items});
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          placeholder={'Search a Podcast!'}
          onChangeText={searchTerm => this.search(searchTerm)}
          value={this.state.searchTerm}
        />
        <FlatList
          data={this.state.items}
          renderItem={({item}) => <Text>{item.name}</Text>}
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
