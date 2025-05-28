import { TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { API_ENDPOINTS } from '@/config/api';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_ENDPOINTS.TODOS);
      const data = await response.json();
      
      if (data.success) {
        setTodos(data.data);
      } else {
        setError('Failed to fetch todos');
      }
    } catch (err) {
      setError('Unable to connect to server');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: inputText,
        completed: false
      }]);
      setInputText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <View className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-2 shadow-sm">
      <TouchableOpacity onPress={() => toggleTodo(item.id)} className="flex-row items-center flex-1">
        <Ionicons 
          name={item.completed ? "checkbox" : "square-outline"} 
          size={24} 
          color={item.completed ? "#10b981" : "#6b7280"} 
        />
        <Text className={`text-base ml-3 flex-1 ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)} className="pl-3">
        <Ionicons name="trash-outline" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="px-5 pt-16 pb-5">
        <Text className="text-3xl font-bold text-gray-900">My Tasks</Text>
        <Text className="text-base text-gray-500 mt-1">{todos.filter(t => !t.completed).length} active</Text>
      </View>
      
      {loading ? (
        <View className="flex-1 justify-center items-center px-10">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-base text-gray-500 mt-3">Loading todos...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-10">
          <Ionicons name="cloud-offline-outline" size={48} color="#ef4444" />
          <Text className="text-base text-red-500 mt-3 text-center">{error}</Text>
          <TouchableOpacity className="mt-4 bg-blue-500 px-6 py-2.5 rounded-lg" onPress={fetchTodos}>
            <Text className="text-white text-base font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 96 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <View className="absolute bottom-0 left-0 right-0 flex-row px-5 pb-8 pt-3 bg-gray-50">
        <TextInput
          className="flex-1 bg-white rounded-xl px-4 py-3.5 text-base border border-gray-200 mr-2.5"
          placeholder="Add a new task..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity className="bg-blue-500 w-12 h-12 rounded-full justify-center items-center shadow-lg shadow-blue-500/30" onPress={addTodo}>
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
