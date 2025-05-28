import { TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { API_ENDPOINTS } from '@/config/api';
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';

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

  const renderTodo = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    const handleDrag = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      drag();
    };

    return (
      <ScaleDecorator>
        <View
          className={`flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl mb-2 shadow-sm ${
            isActive ? 'opacity-80 scale-105' : ''
          }`}
        >
          <TouchableOpacity 
            onPress={() => toggleTodo(item.id)} 
            onLongPress={handleDrag}
            disabled={isActive}
            className="flex-row items-center flex-1"
          >
            <Ionicons 
              name={item.completed ? "checkbox" : "square-outline"} 
              size={24} 
              color={item.completed ? "#10b981" : "#6b7280"} 
            />
            <Text className={`text-base ml-3 flex-1 text-gray-700 dark:text-gray-100 ${
              item.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
            }`}>
              {item.text}
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => deleteTodo(item.id)} className="pl-3">
              <Ionicons name="trash-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleDrag}
              disabled={isActive}
              className="pl-3 py-1"
            >
              <Ionicons name="reorder-three" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="px-5 pt-16 pb-5">
        <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Tasks</Text>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-base text-gray-500 dark:text-gray-400">{todos.filter(t => !t.completed).length} active</Text>
          {todos.length > 0 && (
            <Text className="text-sm text-gray-400 dark:text-gray-500">Tap ≡ or long press to reorder</Text>
          )}
        </View>
      </View>
      
      {loading ? (
        <View className="flex-1 justify-center items-center px-10">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-base text-gray-500 dark:text-gray-400 mt-3">Loading todos...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-10">
          <Ionicons name="cloud-offline-outline" size={48} color="#ef4444" />
          <Text className="text-base text-red-500 dark:text-red-400 mt-3 text-center">{error}</Text>
          <TouchableOpacity className="mt-4 bg-blue-500 px-6 py-2.5 rounded-lg" onPress={fetchTodos}>
            <Text className="text-white text-base font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <DraggableFlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={item => item.id}
          onDragEnd={({ data }) => setTodos(data)}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 96 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <View className="absolute bottom-0 left-0 right-0 flex-row px-5 pb-8 pt-3 bg-gray-50 dark:bg-gray-900">
        <TextInput
          className="flex-1 bg-white dark:bg-gray-800 rounded-xl px-4 py-3.5 text-base text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 mr-2.5"
          placeholder="Add a new task..."
          placeholderTextColor="#9ca3af"
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
