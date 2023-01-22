import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons'
import Task from './src/Task'

export default function App() {
  const [task, setTask] = useState('');
  const [listTasks, setListTasks] = useState([
    {
      id: 1,
      item: 'Estudar react.js'
    },
    {
      id: 2,
      item: 'Estudar vue.js'
    },
  ]);

  const addTask = () => {
    if (task === '') {
      alert('Digite sua tarefa para poder adicionar!')
      return;
    }

    const data = {
      id: Date.now(),
      item: task
    }

    setListTasks(oldArray => [data, ...oldArray])
    setTask('')
  }

  const deleteTask = (item) => {
    let filtroItem = listTasks.filter((task) => {
      return task.item !== item.item && task.id !== item.id
    });

    setListTasks(filtroItem);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholder='Digite sua tarefa'
          style={styles.input}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={addTask}>
            <FontAwesome name='plus' size={20} color='#FFF' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={listTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Task data={item} deleteItem={() => deleteTask(item)} />}
        style={styles.listTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA69E',
    paddingTop: 28,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12,
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  input: {
    width: '75%',
    backgroundColor: '#FFF',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  buttonAdd: {
    width: '15%',
    height: 44,
    backgroundColor: '#93e1d8',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  listTask: {
    flex: 1,
    backgroundColor: '#FFECEB',
    paddingStart: '4%',
    paddingEnd: '4%'
  }
})