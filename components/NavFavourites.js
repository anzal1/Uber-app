import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";

const data = [
  {
    id: 123,
    icon: "home",
    location: "Home",
    destination: "Kazmain,Lucknow",
  },
  {
    id: 456,
    icon: "briefcase",
    location: "Work",
    destination: "Delhi,India",
  },
  {
    id: 789,
    icon: "logo-github",
    location: "Github",
    destination: "Anzal Husain Abidi",
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={tw`border-b border-gray-200`} />
      )}
      renderItem={({ item: { location, destination, icon } }) =>
        location === "Github" ? (
          <TouchableOpacity
            onPress={() => Linking.openURL("https://github.com/anzal1")}
            style={tw`flex-row items-center p-5`}
          >
            <Icon
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              name={icon}
              type="ionicon"
              color="white"
              size={18}
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>{location}</Text>
              <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <Icon
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              name={icon}
              type="ionicon"
              color="white"
              size={18}
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>{location}</Text>
              <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    />
  );
};

export default NavFavourites;
