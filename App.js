import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Text, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveCountables(countables);
    }
  }, [countables, isLoaded]);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count = Math.max(0, newState[index].count + amount); 
    setCountables([...newState].sort((a, b) => b.count - a.count)); 
  };

  const addNewCountable = (name) => {
    if (countables.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      Alert.alert("Fel", "Det finns redan ett objekt med det namnet");
      return;
    }
    const newState = [...countables, { name, count: 0 }];
    setCountables([...newState].sort((a, b) => b.count - a.count)); // Sortera listan
  };

  const deleteCountable = (index) => {
    Alert.alert("Bekräfta", "Vill du verkligen ta bort detta objekt?", [
      { text: "Avbryt", style: "cancel" },
      { text: "Ta bort", onPress: () => {
          const newState = countables.filter((_, i) => i !== index);
          setCountables(newState);
      } }
    ]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "undefined"}
          style={styles.container}
        >
          {countables.length === 0 ? (
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.emptyMessage}>Inget att räkna ännu!</Text>
            </ScrollView>
          ) : (
            <ScrollView keyboardShouldPersistTaps="handled">
              {countables.map((countable, index) => (
                <CountableRow
                  countable={countable}
                  key={countable.name}
                  changeCount={changeCount}
                  deleteCountable={deleteCountable}
                  index={index}
                />
              ))}
            </ScrollView>
          )}
          <AddRow addNewCountable={addNewCountable} />
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyMessage: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  }, 
});

