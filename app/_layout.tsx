import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "@/src/lib/theme";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { AuthProvider } from "@/src/contexts/AuthContext";
import merge from "deepmerge";

const customlightTheme = { ...MD3LightTheme, lightTheme };
const customDarkTheme = { ...MD3DarkTheme, darkTheme };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customlightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isMounted, setIsMounted] = useState(false);

  const theme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Slot />
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
      </PaperProvider>
    </AuthProvider>
  );
}
