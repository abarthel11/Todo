import { View, Text } from 'react-native';

export default function TestScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-2xl font-bold">NativeWind Test</Text>
      <View className="mt-4 p-4 bg-white rounded-lg">
        <Text className="text-black">If you see this styled, NativeWind works!</Text>
      </View>
    </View>
  );
}