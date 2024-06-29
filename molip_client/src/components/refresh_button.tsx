import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function RefreshButton({
    onPress,
}: {
    onPress: () => Promise<void>;
}): JSX.Element {
    const [refreshing, setRefreshing] = React.useState(false);

    return (
        <View className="flex-col justify-end mb-0.5">
            <TouchableOpacity
                onPress={async () => {
                    setRefreshing(true);
                    await onPress();
                    setRefreshing(false);
                }}
                disabled={refreshing}
                style={{
                    opacity: refreshing ? 0.5 : 1,
                }}>
                <Ionicons name={'refresh'} size={20} color="black" />
            </TouchableOpacity>
        </View>
    );
}
