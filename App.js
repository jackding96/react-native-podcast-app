import React from 'react';
import Parser from 'rss-parser';
import { StyleSheet, TextInput, FlatList, Text, View, Image } from 'react-native';

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

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=podcast&entity=podcast&attribute=titleTerm`)
      .then(r => r.json())
      .then((rJson) => {
        console.log(rJson);
        const items = rJson.results.map((el) => {
          let parser = new Parser();
          return {
            title: el.collectionName,
            artist: el.artistName,
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
          placeholder={'Search'}
          onChangeText={searchTerm => this.search(searchTerm)}
          value={this.state.searchTerm}
        />
        <FlatList
          data={this.state.items}
          renderItem={({item}) => {
            return (<View style={styles.lineItem}>
              <Text>{item.title}</Text>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: item.artwork}}
              />
            </View>)
          }}
        />       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20
  },
  inputBox: {
    width: "100%",
    height: 40,
    fontSize: 14,
  },
  lineItem: {
    marginBottom: 10,
  }
});
