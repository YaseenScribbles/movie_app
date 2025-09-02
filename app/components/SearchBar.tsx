import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface SearchBarProps {
    placeholderText: string;
    onPress?: () => void;
    value?: string;
    onChange?: (text: string) => void;
}

const SearchBar = ({ placeholderText, onPress, value, onChange } : SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
      <Image
        source={icons.search}
        className="size-5"
        tintColor={"#ab8bff"}
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={"#a8b5db"}
        className="flex-1 ml-2 text-white"
        value={value}
        onChangeText={onChange}
        onPress={onPress}
      />
    </View>
  );
};

export default SearchBar;
