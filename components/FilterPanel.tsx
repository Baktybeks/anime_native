import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FilterPanelProps {
    startYear: string;
    setStartYear: (value: string) => void;
    endYear: string;
    setEndYear: (value: string) => void;
    categories: string[];
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    startYear,
    setStartYear,
    endYear,
    setEndYear,
    categories,
    selectedCategories,
    setSelectedCategories,
}) => {
    return (
        <View className="mb-4">
            <TextInput
                className="h-12 border border-gray-300 rounded px-2 mb-2"
                placeholder="From Year"
                keyboardType="numeric"
                value={startYear}
                onChangeText={setStartYear}
            />
            <TextInput
                className="h-12 border border-gray-300 rounded px-2 mb-2"
                placeholder="To Year"
                keyboardType="numeric"
                value={endYear}
                onChangeText={setEndYear}
            />
            <Picker
                selectedValue={selectedCategories[0] || ''}
                className="h-12 mb-2"
                onValueChange={(value: string) => {
                    if (value && !selectedCategories.includes(value)) {
                        setSelectedCategories([...selectedCategories, value]);
                    }
                }}
            >
                <Picker.Item label="Select Category" value="" />
                {categories.map((category) => (
                    <Picker.Item key={category} label={category} value={category} />
                ))}
            </Picker>
            <View className="flex-row flex-wrap">
                {selectedCategories.map((category) => (
                    <Text
                        key={category}
                        className="bg-gray-200 rounded px-2 py-1 text-xs mr-2 mb-2"
                    >
                        {category}
                    </Text>
                ))}
                <Button
                    title="Clear"
                    onPress={() => {
                        setSelectedCategories([]);
                        setStartYear('');
                        setEndYear('');
                    }}
                />
            </View>
        </View>
    );
};

export default FilterPanel;