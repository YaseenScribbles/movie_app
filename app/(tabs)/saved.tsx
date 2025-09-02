import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const Saved = () => {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <View className="flex-col items-center gap-5">
        <Image source={icons.save} className="size-5" tintColor="#fff" />
        <Text className="text-sm text-gray-500">Saved</Text>
      </View>
    </View>
  );
};

export default Saved;
