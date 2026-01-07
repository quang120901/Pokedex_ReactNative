import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';

const { BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } = theme;

interface Props {
    message: string;
    onRetry?: () => void;
}

const ErrorState: React.FC<Props> = ({ message, onRetry }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>⚠️ Error</Text>
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <TouchableOpacity style={styles.button} onPress={onRetry}>
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
        gap: SPACING.md,
    },
    title: {
        fontSize: TYPOGRAPHY.title.fontSize,
        fontWeight: TYPOGRAPHY.title.fontWeight,
        color: COLORS.error,
    },
    message: {
        fontSize: TYPOGRAPHY.body.fontSize,
        textAlign: 'center',
        color: COLORS.text,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
    },
    buttonText: {
        fontSize: TYPOGRAPHY.subtitle.fontSize,
        fontWeight: TYPOGRAPHY.subtitle.fontWeight,
        color: COLORS.background,
    },
});

export default ErrorState;