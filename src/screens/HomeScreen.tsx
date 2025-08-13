import { View } from "react-native";
import InterText from "@/components/texts/InterText.tsx";
import ScreenContainer from "@/components/views/ScreenContainer.tsx";

const HomeScreen = () => {
  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <InterText>asd</InterText>
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;
