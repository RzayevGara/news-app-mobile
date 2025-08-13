import { FC } from "react";
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack, { MainStackParamList } from "@/navigation/MainStack.tsx";
import { MainStackRoutes } from "@/utils/enums/route-names.ts";
import { navigationRef } from "@/navigation/RootNavigationRef.ts";

export type RootStackParamList = {
  [MainStackRoutes.MainStack]: NavigatorScreenParams<MainStackParamList>;
};

const Root = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen name={MainStackRoutes.MainStack} component={MainStack} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
