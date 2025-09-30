import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appWrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text> Error: {moviesError?.message || trendingError}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
              </View>
            )}
            <>
              <FlatList
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mb-4 mt-3"
              />
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies?.results}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "center",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              ></FlatList>
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
//  LOG  {"$collectionId": "681f69560015f847179d", "$createdAt": "2025-05-14T19:13:10.354+00:00", "$databaseId": "681f68eb001707b11a5d", "$id": "6824eb45003958a36d1c", "$permissions": [], "$updatedAt": "2025-05-14T19:13:10.354+00:00", "count": 1, "movie_id": 1359227, "poster_url": "https://image/tmdb.org/t/pw500/4KfgyzCgJeG0XJDbqNztdP730Pv.jpg", "searchTerm": "Avengers", "title": "LEGO Marvel Avengers: Mission Demolition"}
