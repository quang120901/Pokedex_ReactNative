import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

interface Props {
    message?: string;
}

const LoadingSpinner: React.FC<Props> = ({ message = 'Loading...' }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.text, { color: colors.textSecondary }]}>{message}</Text>
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
    },
});

export default LoadingSpinner;