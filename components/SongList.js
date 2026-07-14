import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import Song from "./Song";
import { useNavigation } from "@react-navigation/native";

const renderSong = ({ item, index }) => (
  <Song
    index={index}
    imageUrl={"https://www.google.com/imgres?q=mr%20baldi%20basics&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FaVWOcEptfO8%2Fhq720.jpg%3Fsqp%3D-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD%26rs%3DAOn4CLCjOZAa7RlVuHhPXreSXrelKG7rew&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DaVWOcEptfO8&docid=l3Bs796qqyOPFM&tbnid=lVzlhkc0K9IdPM&vet=12ahUKEwjNvaC9idOVAxUaEkQIHUd7PA0QnPAOegUIoQEQAA..i&w=686&h=386&hcb=2&ved=2ahUKEwjNvaC9idOVAxUaEkQIHUd7PA0QnPAOegUIoQEQAA"}
    songTitle={item.songTitle}
    songArtists={item.songArtists}
    albumName={item.albumName}
    duration={item.duration}
  />
);

const SongList = ({ tracks }) => {
  // console.log("artist", tracks[0].songArtists);
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={(item, index) => renderSong(item, index)}
        keyExtractor={(item) => item.songTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 20,
  },
  text: {
    color: Themes.colors.gray,
  },
});

export default SongList;
