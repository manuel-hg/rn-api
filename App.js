import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';


export default function App() {

  useEffect(() => {
    getInfo();
  },[]);

  const [initialState, setInitialState] = useState({
    texto: '',
    data: [],
    isLoading: true
  });
  const { texto, data, isLoading } = initialState;

  const handleSetPokeByName = async(e) => {
      try{
        const request = await fetch('https://pokeapi.co/api/v2/pokemon');
        const response = await request.json();
        const mapeo = response.results.map((a,b,c) => (a) && ({...a, id:b+1}));
        const busqueda = mapeo.filter(mapeo => mapeo.name === e);
        setInitialState({ ...initialState, data:busqueda, texto: e })
      } catch (error) {
        console.log(error)
      }
  }

  const getInfo = async () => {
    try {
      const request = await fetch('https://pokeapi.co/api/v2/pokemon');
      const response = await request.json();
      const mapeo = response.results.map((a,b,c) => (a) && ({...a, id:b+1}));
      setInitialState({ ...initialState, data: mapeo, texto: '', isLoading: false })
      
    } catch (error) {
      console.log(error)
      setInitialState({ ...initialState, isLoading: false })
    }
  }

const Item = ({name, id}) =>{
  return(
    <TouchableOpacity>
      <View style={{ flex: 1, alignSelf: "stretch", borderBottomWidth: 1, borderColor: '#DADADA', height: 45, justifyContent: 'center', paddingLeft: 10, backgroundColor: (parseInt(id) % 2) === 0 ? '#F7F7F7' : 'white' }}>
        <Text style={{ fontSize: 22 }}>{id} - {name}</Text>
      </View>
    </TouchableOpacity>
  )
}



  return (
    <>
      <StatusBar style="light-content" />
      <View style={styles.container}>
        <View style={{ height: 'auto', alignSelf: 'stretch' }}>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            placeholder="Buscar..."
            onChangeText={(e) => handleSetPokeByName(e)}
            onClear={() => getInfo()}
            value={texto}
          />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", justifyContent: 'center', alignItems: 'center' }}>
          {
          isLoading
          ?
            <ActivityIndicator size="large" color="#D7D7D7" />
          :
            <FlatList
              style={{ alignSelf: "stretch", height: 'auto' }}
              data={data}
              keyExtractor={item => item.name}
              renderItem={({ item }) => <Item name={item.name} id={item.id}/>}
            />
          }
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
