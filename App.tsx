import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {SafeAreaProvider} from "react-native-safe-area-context";
import RootNavigator from "@/navigation/RootNavigator.tsx";

const queryClient = new QueryClient();


function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
              <RootNavigator />
          </SafeAreaProvider>
      </QueryClientProvider>
  );
}


export default App;
