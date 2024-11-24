import { AppState } from 'react-native'
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lajbnjgwroswuzkfpyjg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhamJuamd3cm9zd3V6a2ZweWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNjcwMDEsImV4cCI6MjA0Nzg0MzAwMX0.XJE6Wo1kXVDgzEcyrmzJ1Yn0qWVFm9x1RxNWNwkPnm8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
