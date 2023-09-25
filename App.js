import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';

const URL = "https://www.boredapi.com/api/activity";

export default function App() {
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("");
  const [participants, setParticipants] = useState(0);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState();
  
  useEffect(()=> {
    fetch(URL)
      .then(response => response.json())
      .then ((json) => {
        console.log(json);
        setActivity(firstLetterToLowerCase(json.activity));
        setType(json.type);
        setParticipants(json.participants);
        setPrice(json.price);
        setError(null);
        setIsLoading(false);
      },(error) => {
        setError("Error retrieving activity!");
        setIsLoading(false);
        console.log(error);
      })
  },[refresh])

  const firstLetterToLowerCase = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  const getNewActivity = () => {
    setRefresh({});
  }


  if (isLoading) {
    return <View style={styles.container}><ActivityIndicator size="large"/></View>
  } else if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>I'm so bored...</Text>
        <Text style={styles.activity}>As a {type} type of activity {activity}. 
        It takes {participants} participant(s) and
        {price === 0 ? ' does not cost anything.': ' is probably quite cheap.'}
        </Text>
        <Button title="Refresh" onPress={() => getNewActivity()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },  
  activity: {
    marginBottom: 10,
  }
});
