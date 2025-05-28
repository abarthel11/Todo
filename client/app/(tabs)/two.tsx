import { TouchableOpacity, Switch, View, Text, Modal, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { useColorScheme } from "@/components/useColorScheme";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const { themeOption, setThemeOption, currentTheme } = useTheme();
  const systemTheme = useColorScheme();

  return (
    <View className={`flex-1 ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className="px-5 pt-16 pb-5">
        <Text className={`text-3xl font-bold ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Settings</Text>
      </View>

      <View className={`mx-5 mb-5 rounded-xl overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <View className={`flex-row items-center justify-between p-4 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
          <View className="flex-row items-center">
            <Ionicons name="notifications-outline" size={24} color="#3b82f6" />
            <Text className={`text-base ml-3 ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            thumbColor={notifications ? "#3b82f6" : "#f3f4f6"}
          />
        </View>

        <TouchableOpacity 
          className="flex-row items-center justify-between p-4"
          onPress={() => setShowThemeModal(true)}
        >
          <View className="flex-row items-center">
            <Ionicons name="moon-outline" size={24} color="#3b82f6" />
            <Text className="text-base text-gray-700 ml-3">Theme</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-base text-gray-500 mr-2">
              {themeOption === 'system' ? 'System' : themeOption === 'dark' ? 'Dark' : 'Light'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </View>
        </TouchableOpacity>
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

      <Modal
        visible={showThemeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <Pressable 
          className="flex-1 justify-end bg-black/50"
          onPress={() => setShowThemeModal(false)}
        >
          <View className="bg-white rounded-t-3xl p-6">
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
            <Text className="text-xl font-bold text-gray-900 mb-4">Choose Theme</Text>
            
            <TouchableOpacity
              className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                themeOption === 'light' ? 'bg-blue-50' : 'bg-gray-50'
              }`}
              onPress={() => {
                setThemeOption('light');
                setShowThemeModal(false);
              }}
            >
              <View className="flex-row items-center">
                <Ionicons 
                  name="sunny-outline" 
                  size={24} 
                  color={themeOption === 'light' ? '#3b82f6' : '#6b7280'} 
                />
                <Text className={`text-base ml-3 ${
                  themeOption === 'light' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                  Light
                </Text>
              </View>
              {themeOption === 'light' && (
                <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                themeOption === 'dark' ? 'bg-blue-50' : 'bg-gray-50'
              }`}
              onPress={() => {
                setThemeOption('dark');
                setShowThemeModal(false);
              }}
            >
              <View className="flex-row items-center">
                <Ionicons 
                  name="moon" 
                  size={24} 
                  color={themeOption === 'dark' ? '#3b82f6' : '#6b7280'} 
                />
                <Text className={`text-base ml-3 ${
                  themeOption === 'dark' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                  Dark
                </Text>
              </View>
              {themeOption === 'dark' && (
                <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center justify-between p-4 rounded-xl mb-6 ${
                themeOption === 'system' ? 'bg-blue-50' : 'bg-gray-50'
              }`}
              onPress={() => {
                setThemeOption('system');
                setShowThemeModal(false);
              }}
            >
              <View className="flex-row items-center">
                <Ionicons 
                  name="phone-portrait-outline" 
                  size={24} 
                  color={themeOption === 'system' ? '#3b82f6' : '#6b7280'} 
                />
                <Text className={`text-base ml-3 ${
                  themeOption === 'system' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                  System
                </Text>
              </View>
              {themeOption === 'system' && (
                <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
              )}
            </TouchableOpacity>

            <Text className="text-sm text-gray-500 text-center">
              {themeOption === 'system' 
                ? `Currently using ${systemTheme} theme based on system settings`
                : `Using ${themeOption} theme`
              }
            </Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
