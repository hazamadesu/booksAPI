import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      desc: "",
      thumbnail: ""
    };
  };

  componentDidMount() {
      this._fetch();
  };

  _fetch = () => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:9784798060996")
      .then((response) => response.json())
      .then((jsonData) => this.setState({
        title     : jsonData.items[0].volumeInfo.title,
        author    : jsonData.items[0].volumeInfo.authors[0],
        desc      : jsonData.items[0].volumeInfo.description,
        thumbnail : jsonData.items[0].volumeInfo.imageLinks.thumbnail,
      }))
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{ this.state.title }</Text>
        <Text>{ this.state.author }</Text>
        <Text>{ this.state.desc }</Text>
        <Image
          source={{ uri: 'http://books.google.com/books/content?id=JeUrzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }}
          style={{ width: 100, height: 150 }}
        />
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
