import { Text, View, StyleSheet } from "react-native";
import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, deleteCountable, index }) => (
  <View style={CommonStyles.row}>
    <View style={styles.nameColumn}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    <View style={styles.buttonColumn}>
      <CountableButton label="+" submit={() => changeCount(1, index)} />
      <CountableButton
        label=" - "
        submit={() => changeCount(-1, index)}
        disabled={countable.count === 0} // Förhindrar negativa tal
      />
      <CountableButton label="🗑️" submit={() => deleteCountable(index)} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.7,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
