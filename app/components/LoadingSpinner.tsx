import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme';

const { COLORS, SPACING, TYPOGRAPHY } = theme;

interface Props {
    message?: string;
}

const LoadingSpinner: React.FC<Props> = ({ message = 'Loading...' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.md,
    },
    text: {
        fontSize: TYPOGRAPHY.body.fontSize,
        color: COLORS.textSecondary,
    },
});

export default LoadingSpinner;