import { TouchableOpacity, Switch, View, Text } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-5 pt-16 pb-5">
        <Text className="text-3xl font-bold text-gray-900">Settings</Text>
      </View>

      <View className="bg-white mx-5 mb-5 rounded-xl overflow-hidden">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
          <View className="flex-row items-center">
            <Ionicons name="notifications-outline" size={24} color="#3b82f6" />
            <Text className="text-base text-gray-700 ml-3">Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            thumbColor={notifications ? "#3b82f6" : "#f3f4f6"}
          />
        </View>

        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center">
            <Ionicons name="moon-outline" size={24} color="#3b82f6" />
            <Text className="text-base text-gray-700 ml-3">Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            thumbColor={darkMode ? "#3b82f6" : "#f3f4f6"}
          />
        </View>
      </View>

      <View className="bg-white mx-5 mb-5 rounded-xl overflow-hidden">
        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
          <View className="flex-row items-center">
            <Ionicons name="share-outline" size={24} color="#3b82f6" />
            <Text className="text-base text-gray-700 ml-3">Share App</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
          <View className="flex-row items-center">
            <Ionicons name="star-outline" size={24} color="#3b82f6" />
            <Text className="text-base text-gray-700 ml-3">Rate Us</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center">
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#3b82f6"
            />
            <Text className="text-base text-gray-700 ml-3">About</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
