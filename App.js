import * as React from 'react';
import { StyleSheet,Button, Image, View, CameraRoll, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  state = { image: null,};

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.gallerybutton}>
        <Button color="#32CD32" title="Select image from Gallery" onPress={this._pickImage} />
        </View>

        {image && <Image source={{ uri: image }} style={{ justifyContent: 'space-evenly', width: 250, height: 250 }} />}

        <View style={styles.camerabutton}>
        <Button color="#0000CD" title="Select image from Camera" onPress={this._takePhoto} />
        </View>
      </View>
    );
  }

  _pickImage = async () => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status == 'granted') {
    try {
      let pic = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!pic.cancelled) {
        this.setState({ image: pic.uri });
      }
      console.log(pic);
    } catch (E) {
      console.log(E);
    }
  }
  else{
    Alert.alert("You need permission to use Camera Roll");
  }
};

  _takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status == 'granted') {
    try {
      let pic = await ImagePicker.launchCameraAsync({
        allowEditing: true,
        aspect: [4, 3],
        quality: 1,
        exif: true
      });
      if (!pic.cancelled) {
        this.setState({ image: pic.uri });
      }
      CameraRoll.saveToCameraRoll(this.state.image);
    } catch (E) {
      console.log(E);
    }
  }
  else{
    Alert.alert("You need permission to use Camera");
 }
  };
}

const styles = StyleSheet.create({

  container: {
    flex: 2,
    justifyContent: 'center',
    marginHorizontal:50
    },

  gallerybutton: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  camerabutton: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }

});
