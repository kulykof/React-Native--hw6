import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { login, email } = useSelector(state => state.auth);
  console.log(login, email);

  const getPosts = async () => {
    await onSnapshot(collection(db, 'posts'), snapshots => {
      setPosts(snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.img}></Image>
        <View style={styles.nameEmailWrapper}>
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.photosContainer}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.photoName}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Comments', {
                    postId: item.id,
                    photo: item.photo,
                  });
                }}
              >
                <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  navigation.navigate('MapScreen', { location: item.location });
                }}
              >
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}></Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
  },
  img: {
    marginHorizontal: 16,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 16,
    marginTop: 32,
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
  nameEmailWrapper: {
    marginTop: 48,
    marginLeft: 8,
  },
  photosContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  photo: {
    backgroundColor: 'black',
    height: 240,
  },
  photoName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginTop: 8,
  },
  locationText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});
