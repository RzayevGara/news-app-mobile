import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackRoutes } from "@/utils/enums/route-names.ts";
import { useThemeColors } from "@/theme";
import HomeScreen from "@/screens/HomeScreen.tsx";

export type MainStackParamList = {
  [MainStackRoutes.HomeStack]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  const colors = useThemeColors();
  return (
    <Stack.Navigator initialRouteName={MainStackRoutes.HomeStack}>
      <Stack.Screen
        name={MainStackRoutes.HomeStack}
        component={HomeScreen}
        options={({ navigation, route: { params } }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: colors.background,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
