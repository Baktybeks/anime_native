import React from 'react';
import { View, Button } from 'react-native';

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    hasPrevious: boolean;
    hasNext: boolean;
}
function Pagination({ page, setPage, hasPrevious, hasNext }: PaginationProps) {
    return (
        <View className="flex-row justify-between mt-4">
            <Button
                title="Previous"
                onPress={() => setPage(page - 1)}
                disabled={!hasPrevious}
                color={hasPrevious ? undefined : 'gray'}
            />
            <Button
                title="Next"
                onPress={() => setPage(page + 1)}
                disabled={!hasNext}
                color={hasNext ? undefined : 'gray'}
            />
        </View>
    );
};

export default Pagination;
