import {View, Image, ScrollView, Text} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from './../Components/Header';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CustomButton} from '../Components/CustomButton';
import {LoginContext} from '../Context/LoginContext';
import {useToast} from 'react-native-toast-notifications';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export function ImageScreen() {
  const [image, setImage] = useState(null);
  const {uploadImage} = useContext(LoginContext);
  const [IsImageUpdated, setIsImageUpdated] = useState(false);
  const toast = useToast();

  const selectImage = async type => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      selectionLimit: 1,
    };
    let path, fileName;
    let res;
    if (type === 'upload') {
      res = await launchImageLibrary(options);
    } else {
      res = await launchCamera(options);
    }
    path = res.assets[0].uri;
    fileName = res.assets[0].fileName;
    const result = await uploadImage(path, fileName);
    setIsImageUpdated(true);
    toast.show(result.message, {
      type: 'normal',
      placement: 'top',
      duration: 4000,
      offset: 30,
      animationType: 'slide-in',
    });
  };

  const getImage = async () => {
    const url = await storage()
      .ref('/' + 'Images')
      .getDownloadURL();
    if (url) {
      setImage(url);
    }
    setIsImageUpdated(false);
  };
  useEffect(() => {
    getImage();
  }, [IsImageUpdated]);

  return (
    <SafeAreaView style={safeAreaConatiner}>
      <View style={mainContainer}>
        <Header text="Image Screen" />
        <ScrollView style={ImageContainer}>
          <Text style={textstyle}>Uploaded Image</Text>
          {image && (
            <Image
              source={{uri: image}}
              style={{height: 300, width: '100%', resizeMode: 'contain'}}
            />
          )}
        </ScrollView>
        <View style={buttonContainer}>
          <CustomButton
            text={'Camera Image'}
            onPress={() => selectImage('capture')}
            CustomStyle={{marginBottom: 10}}
          />
          <CustomButton
            text={'Upload Image'}
            onPress={() => {
              selectImage('upload');
            }}
            CustomStyle={{marginBottom: 10}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const safeAreaConatiner = {
  flex: 1,
  backgroundColor: 'white',
};
const mainContainer = {
  flex: 1,
  paddingHorizontal: 10,
};
const buttonContainer = {
  flex: 1,
  justifyContent: 'flex-end',
  marginVertical: 20,
};

const ImageContainer = {
  borderWidth: 1,
  borderColor: '#ff3e6c',
  borderRadius: 10,
  padding: 10,
};

const textstyle = {
  color: 'black',
  fontSize: 20,
  textAlign: 'center',
  padding: 10,
};
