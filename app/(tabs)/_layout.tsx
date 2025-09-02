import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import {
    Image,
    ImageBackground,
    ImageSourcePropType,
    Text,
    View,
} from "react-native";

const TabIcon = ({
  focused,
  icon,
  text,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  text: string;
}) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex-1 flex-row justify-center items-center mt-4 w-full min-w-[112px] min-h-16 rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-4" />
        <Text className="text-secondary text-sm font-semibold ml-2">
          {text}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full items-center justify-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-4" />
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: (focused) => (
            <>
              <TabIcon
                focused={focused.focused}
                icon={icons.home}
                text="Home"
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: (focused) => (
            <>
              <TabIcon
                focused={focused.focused}
                icon={icons.search}
                text="Search"
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: (focused) => (
            <>
              <TabIcon
                focused={focused.focused}
                icon={icons.save}
                text="Saved"
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: (focused) => (
            <>
              <TabIcon
                focused={focused.focused}
                icon={icons.person}
                text="Profile"
              />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
