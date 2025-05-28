import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeOption = 'light' | 'dark' | 'system';
type Theme = 'light' | 'dark';

interface ThemeContextType {
  themeOption: ThemeOption;
  setThemeOption: (option: ThemeOption) => void;
  currentTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme_preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useSystemColorScheme() ?? 'light';
  const [themeOption, setThemeOption] = useState<ThemeOption>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeOption(savedTheme as ThemeOption);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (option: ThemeOption) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, option);
      setThemeOption(option);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const currentTheme: Theme = themeOption === 'system' ? systemTheme : themeOption;

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        themeOption, 
        setThemeOption: saveThemePreference, 
        currentTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}