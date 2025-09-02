import { icons } from "@/constants/icons";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchMovieDetails } from "../services/api";
import useFetch from "../services/useFetch";

const MovieInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-sm font-normal text-light-200">{label}</Text>
    <Text className="text-light-100 text-sm mt-2 font-bold">
      {value ?? "N/A"}
    </Text>
  </View>
);

const MovieDetail = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          className="w-full h-[550px]"
          resizeMode="stretch"
        />
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="bg-dark-100 flex-row items-center px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm text-white font-bold">
              {Math.round(movie?.vote_average! ?? 0)}/10
            </Text>
            <Text className="text-sm text-light-200">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview ?? null} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => g.name).join(", ") ?? null}
          />
          <View className="flex-row justify-between w-full">
            <MovieInfo
              label="Budget Info"
              value={`$${((movie?.budget ?? 0) / 1_000_000).toFixed(
                0
              )} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${((movie?.revenue ?? 0) / 1_000_000).toFixed(
                0
              )} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(", ") ?? null
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row justify-center items-center z-50" onPress={router.back}>
        <Image
          source={icons.arrow}
          className="size-5 mr-2 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-base font-semibold text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetail;
