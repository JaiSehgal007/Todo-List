import { StyleSheet, Text, View,Button, TextInput,ScrollView,FlatList} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';


export default function App() {
  const [modalIsVisible,setModelIsVisible]= useState(false);
  const [courseGoals,setCourseGoals]=useState([]);

  function startAddGoalHandler() {
    setModelIsVisible(true);
  }

  function endAddGoalHandler(){
    setModelIsVisible(false);
  }

  function addGoalHandler(enteredGoalText){
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      {text:enteredGoalText, id: Math.random().toString()},
    ]);
    endAddGoalHandler();
  };

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals=>{
      return currentCourseGoals.filter((goal)=> goal.id!==id);
    });
  }
   
  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}> 
      <Button title='Add New Goal' color="#a065ac" onPress={startAddGoalHandler} />

      {/* {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} />} */}
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList 
          data={courseGoals} 
          renderItem={(itemData)=>{
            return (
              <GoalItem 
                text={itemData.item.text} 
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler} 
              />
            );
          }} 
          keyExtractor={(item,index)=>{
            return item.id;
          }}
          // this function is being used here as in the object field defined the name of key is id, and not key
          alwaysBounceVertical={false}
        />
            
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex:1,
    paddingTop:50,
    paddingHorizontal:16,
    backgroundColor: '#1e085a'
  },
  goalsContainer:{
    // the flex values in the same container the the container in the ration specified
    flex:5,
  },

});

