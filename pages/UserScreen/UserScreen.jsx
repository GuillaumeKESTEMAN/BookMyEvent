import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { useAppContext } from "../../shared/context/AppContext";
import { styles } from "./UserScreen.styles";
import { Icon, Divider, Button } from 'react-native-paper';

export function UserScreen({ navigation }) {
  const { user, logout, deleteAccount } = useAppContext();
  
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <View style={styles.avatar}>
          <Icon source="account" size={40} color="#000000" />
        </View>
        <Text style={styles.userScreenTexts}>
          {user.name}
        </Text>
      </View>
      <View style={styles.secondLevelContainer}>
        <Text style={styles.userScreenTexts}>
          Bio :
        </Text>
        <Text style={styles.userBio}>
          {user.bio}
        </Text>
      </View>

      <View style={styles.secondLevelContainer}>
        <Button
          icon="information"
          mode="contained"
          buttonColor="#DF621E"
          textColor="#000000"
          style={styles.button}
          onPress={() => {
            navigation.navigate('UpdateUserInfo');
          }}
        >
          Update Info
        </Button>

        <Button
          icon="logout"
          mode="contained"
          buttonColor="#DF621E"
          textColor="#000000"
          style={styles.button}
          onPress={() => {
            logout();
            navigation.navigate('sign-in');
          }}
        >
          Log Out
        </Button>

        <Button
          icon="account-remove"
          mode="contained"
          buttonColor="#DF621E"
          textColor="#000000"
          style={styles.button}
          onPress={() => {
            deleteAccount();
            navigation.navigate('sign-in');
          }}
        >
          Delete Account
        </Button>
      </View>
    </View>
  );
}