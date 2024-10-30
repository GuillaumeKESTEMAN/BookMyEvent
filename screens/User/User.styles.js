import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2A2A',
    justifyContent: 'center',
  },
  userScreenTexts: {
    marginStart: 20,
    color: '#FFFFFF',
  },
  avatar: {
    backgroundColor: '#DF621E',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20
  },
  secondLevelContainer: {
    flex: 1
  },
  userBio: {
    color: '#FFFFFF',
    marginTop : 10,
    marginStart: 20,
    marginEnd: 20
  },
  divider: {
    color: '#000000',
    backgroundColor: '#000000',
  },
  button: {
    margin: 20,
    padding: 5
  }
});