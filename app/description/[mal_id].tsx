import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    ScrollView,
    Button,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Anime, fetchAnime } from '@/utils/api';


function DescriptionScreen() {
    const router = useRouter();
    const { mal_id } = useLocalSearchParams<{mal_id: string}>();
    const [ data, setData ] = useState<Anime | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        const getData = async() => {
            if (mal_id) {
                setIsLoading(true);
                const animeData = await fetchAnime(mal_id);
                setData(animeData);
                setIsLoading(false);
            }
        };
        getData();
    }, [ mal_id ]);


    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    if (!data) {
        return (
            <View className="flex-1 justify-center items-center bg-white p-4">
                <Text className="text-center text-red-500 text-lg">
                    No data available. Please try again later.
                </Text>
                <Button title="Назад" onPress={() => router.back()}/>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            <Image
                source={{ uri: data.images.jpg.large_image_url }}
                className="w-full h-72 rounded-lg mb-4"
            />
            <View className="p-4 rounded-lg">
                <Text className="text-2xl font-bold mb-2">
                    {data.title || 'Unknown Title'}
                </Text>
                <Text className="text-base text-gray-600 mb-1">
                    ⭐ {data.score || 'N/A'} ({data.scored_by || 0} users)
                </Text>
                <Text className="text-sm text-gray-500 mb-1">
                    #{data.rank || 'N/A'} Ranking
                </Text>
                <Text className="text-sm text-gray-600 mb-3">
                    {data.type || 'Unknown Type'} • {data.episodes || '?'} episodes
                </Text>
                <Text className="text-sm text-gray-700 mb-3">
                    {data.synopsis || 'No synopsis available.'}
                </Text>
                <View className="flex-row flex-wrap">
                    {data.genres?.map((genre, index) => (
                        <Text
                            key={index}
                            className="bg-gray-200 rounded px-3 py-1 text-xs mr-2 mb-2"
                        >
                            {genre.name}
                        </Text>
                    ))}
                </View>
            </View>
            <TouchableOpacity
                className="absolute top-4 left-4 bg-blue-500 px-4 py-2 rounded-lg"
                onPress={() => router.back()}
            >
                <Text className="text-white font-bold text-lg">Назад</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default DescriptionScreen;