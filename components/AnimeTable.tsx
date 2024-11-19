import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import sort from '../assets/sort.png';
import sortActive from '../assets/sortActive.png';
import { Link } from 'expo-router';


interface Anime {
    mal_id: number;
    title: string;
    genres: {name: string}[];
    year?: number;
    score?: number;
    episodes?: number;
}

interface AnimeTableProps {
    data: Anime[];
    isLoading: boolean;
    startYear: string;
    endYear: string;
    selectedCategories: string[];
}

const AnimeTable: React.FC<AnimeTableProps> = ({
    data,
    isLoading,
    startYear,
    endYear,
    selectedCategories,
}) => {
    const [ sortField, setSortField ] = useState<keyof Anime>('title');
    const [ sortDirection, setSortDirection ] = useState<'asc' | 'desc'>('asc');
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesCategories =
                selectedCategories.length === 0 ||
                item.genres.some((genre) => selectedCategories.includes(genre.name));
            const animeYear = item.year || 0;
            const matchesYear =
                (!startYear || animeYear >= parseInt(startYear, 10)) &&
                (!endYear || animeYear <= parseInt(endYear, 10));

            return matchesCategories && matchesYear;
        });
    }, [ data, selectedCategories, startYear, endYear ]);
    const sortedData = useMemo(() => {
        return [ ...filteredData ].sort((a, b) => {
            const valueA = a[ sortField ] || '';
            const valueB = b[ sortField ] || '';

            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [ filteredData, sortField, sortDirection ]);

    const renderHeaderCell = (field: keyof Anime, label: string) => {
        const dynamicStyle = `column${label}` in styles
            ? styles[ `column${label}` as keyof typeof styles ]
            : undefined;

        return (
            <TouchableOpacity
                style={dynamicStyle}
                className="flex-1 p-2 justify-center items-center"
                onPress={() => {
                    setSortField(field);
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }}
            >
                <View className="flex-row items-center">
                    <Text
                        className={`font-bold text-lg ${
                            sortField === field ? 'text-blue-600' : 'text-black'
                        } mr-2`}
                    >
                        {label}
                    </Text>
                    <Image
                        source={sortField === field ? sortActive : sort}
                        className="w-3 h-3"
                    />
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <ScrollView horizontal>
            <View>
                <View className="flex-row bg-gray-200 border-b border-gray-300">
                    {renderHeaderCell('title', 'Title')}
                    {renderHeaderCell('year', 'Year')}
                    {renderHeaderCell('score', 'Score')}
                    {renderHeaderCell('episodes', 'Episodes')}
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <FlatList
                        data={sortedData}
                        keyExtractor={(item) => item.mal_id.toString()}
                        renderItem={({ item }) => (
                            <View
                                className="flex-row border-b border-gray-300 items-center underline text-left">
                                <Text className="flex-1 p-2 text-blue-600 underline"
                                      style={styles.columnTitle}>
                                    <Link
                                        href={`/description/${item.mal_id}`}
                                        className="text-sm"
                                    >
                                        {item.title || 'N/A'}
                                    </Link>
                                </Text>
                                <Text className="flex-1 p-2 text-center text-sm" style={styles.columnYear}>
                                    {item.year || 'Unknown'}
                                </Text>
                                <Text className="flex-1 p-2 text-center text-sm" style={styles.columnScore}>
                                    {item.score || 'N/A'}
                                </Text>
                                <Text className="flex-1 p-2 text-center text-sm" style={styles.columnEpisodes}>
                                    {item.episodes || 'N/A'}
                                </Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    columnTitle: {
        width: 150,
    },
    columnYear: {
        width: 100,
    },
    columnScore: {
        width: 120,
    },
    columnEpisodes: {
        width: 100,
    },
});


export default AnimeTable;
