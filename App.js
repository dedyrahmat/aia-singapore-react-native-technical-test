import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
} from 'react-native';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const flickrAPI =
    'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=true';
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetchPublicPhotos();

    return () => {
      setPhotos([]);
    };
  }, []);

  const fetchPublicPhotos = () => {
    setPhotos([]);
    axios
      .get(flickrAPI)
      .then(response => {
        setPhotos(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image
        style={{width: '100%', height: 200, resizeMode: 'cover'}}
        source={{
          uri: item.media.m,
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title || 'No title'}</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={item => item.link}
      />
      <FAB
        buttonColor="blue"
        iconTextColor="#FFFFFF"
        onClickAction={fetchPublicPhotos}
        visible={true}
        iconTextComponent={<Icon name="refresh" />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#000',
    opacity: 0.7,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default App;
