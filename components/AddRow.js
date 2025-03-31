import { useState } from "react";
import { View, TextInput, Keyboard, Alert } from "react-native";
import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert("Fel", "Inget namn");
      return;
    }
    addNewCountable(name.trim());
    setName(""); // Rensa input
    Keyboard.dismiss(); // Stäng tangentbordet
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput
        placeholder="Enter name"
        onChangeText={setName}
        value={name}
        
      />
      <CountableButton label="Add" submit={handleAdd} />
    </View>
  );
};
