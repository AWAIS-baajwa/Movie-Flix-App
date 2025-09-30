import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  const match = poster_url.match(/\/([^\/]+\.[a-zA-Z0-9]+)$/);
  // the url we are getting from "poster_url" prop is wrong. it is not fully wrong but only there is '/' instead of '.' so we are getting in poster_url is "https://image/tmdb.org/t/p/w500AiY5My59OJg9fee31X5HLJ7Cg2S.jpg" there is "/" after "image" in url but it should have "." after "image". As it is first part of url which is same for all poster_url so i maked it a string which will not change but the 2nd part is different for every image so that we will get from "match" variable. example of correct poster_url is "https://image.tmdb.org/t/pw500/AiY5My59OJg9fee31X5HLJ7Cg2S.jpg". the part "AiY5My59OJg9fee31X5HLJ7Cg2S" is different fo every poster_url
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${match ? match[1] : null}`,
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        ></Image>
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            ></Image>
          </MaskedView>
        </View>
        <Text
          className="text-sm font-bold mt-2  text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
//
