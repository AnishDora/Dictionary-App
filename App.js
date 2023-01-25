import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import * as Speech from "expo-speech"
export default function App() {
  const [word, setWord] = useState("");
  const [wordsearched, setWordSearched] = useState("");
  const [pos, setPos] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [searched, setSearched] = useState(false);

  const changeText = (val) => {
    setWord(val);
  };
  const speak=()=>{
    Speech.speak(wordsearched)
  };
  const clearInfo = () => {
    setWord("")
    setWordSearched("");
    setPos("");
    setDefinition("");
    setExample("");
    setSynonyms([]);
    setAntonyms([]);
    setPos("");
    setSearched(!searched);
  };
  const getInfo = () => {
    setSearched(true);
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        let wordsearched = response[0].word;
        setWordSearched(wordsearched);
        let definition = response[0].meanings[0].definitions[0].definition;
        setDefinition(definition);
        let example = response[0].meanings[0].definitions[0].example;
        setExample(example);
        let synonyms = response[0].meanings[0].synonyms;
        setSynonyms(synonyms);
        let antonyms = response[0].meanings[0].antonyms;
        setAntonyms(antonyms);
        let pos = response[0].meanings[0].partOfSpeech;
        setPos(pos);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Text style={styles.text}>ENTER THE WORD 🚀 📖</Text>
        </View>
        <TextInput
          value={word}
          style={styles.searchField}
          onChangeText={changeText}
        ></TextInput>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.search} onPress={getInfo}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} onPress={clearInfo}>
            <Text style={styles.searchText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} onPress={() => speak()}>
            <Text style={styles.searchText}>Hear</Text>
          </TouchableOpacity>
        </View>

        {searched === true ? (
          <ScrollView>
            <View>
              <Text style={styles.searchResult}>
                Word Searched: {wordsearched}
              </Text>
              <Text style={styles.searchResult}>Part Of Speech: {pos}</Text>

              <Text style={styles.searchResult}>Definition: {definition}</Text>
              <Text style={styles.searchResult}>
                Example:
                {example === undefined || example.length === 0 ? (
                  <Text> No Example</Text>
                ) : (
                  <Text>{example}</Text>
                )}
              </Text>
              <Text style={styles.searchResult}>
                Synonyms:{"\n"}
                {synonyms.length >= 1 ? (
                  synonyms.map((item, key) => {
                    return (
                      <Text>
                        {key + 1} - {item}{" "}
                      </Text>
                    );
                  })
                ) : (
                  <Text>Synonyms not found at the moment</Text>
                )}
              </Text>
              <Text style={styles.searchResult}>
                Antonyms:{"\n"}
                {antonyms.length >= 1 ? (
                  antonyms.map((item, key) => {
                    return (
                      <Text>
                        {" "}
                        {key + 1} - {item}{" "}
                      </Text>
                    );
                  })
                ) : (
                  <Text>Antonyms not found at the moment</Text>
                )}
              </Text>
            </View>
          </ScrollView>
        ) : (
          <Text></Text>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#002C3E",
  },
  header: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  buttons: {
    flexDirection: "row",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    color: "#F7F8F3",
    fontWeight: "bold",
  },

  search: {
    width: 100,
    height: 50,
    borderColor: "#F7F8F3",
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  searchText: {
    fontSize: 20,
    textAlign: "center",
    color: "#F7F8F3",
  },
  searchResult: { fontSize: 20, padding: 10, margin: 10, color: "#F7F8F3"},
  searchField: {
    width: 350,
    height: 60,
    borderColor: "#F7F8F3",
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    fontSize: 2,
    paddingLeft: 10,
    color: "#F7F8F3",
    fontSize: 20,
  },
});
