import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found"/>
        <Stack.Screen name="WelcomeScreen" />
        <Stack.Screen name="SignInScreen" />
        <Stack.Screen name="SignUpScreen" />
        <Stack.Screen name="HomeScreen1" />
        <Stack.Screen name="LocationScreen" />
        <Stack.Screen name="AlertScreen" />
        <Stack.Screen name="LinkScreen" />
        <Stack.Screen name="SettingsScreen" />
        <Stack.Screen name="EditProfileScreen" />
        <Stack.Screen name="ChangePasswordScreen" />
        <Stack.Screen name="NavigationPreferenceScreen" />  
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
