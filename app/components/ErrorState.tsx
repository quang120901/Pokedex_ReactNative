import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import theme from '../styles/theme';

const { BORDER_RADIUS, SPACING, TYPOGRAPHY } = theme;

interface Props {
    message: string;
    onRetry?: () => void;
}

const ErrorState: React.FC<Props> = ({ message, onRetry }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.error }]}>⚠️ Error</Text>
            <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
            {onRetry && (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.primary }]}
                    onPress={onRetry}
                >
                    <Text style={[styles.buttonText, { color: colors.background }]}>Try Again</Text>
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
    },
    message: {
        fontSize: TYPOGRAPHY.body.fontSize,
        textAlign: 'center',
    },
    button: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
    },
    buttonText: {
        fontSize: TYPOGRAPHY.subtitle.fontSize,
        fontWeight: TYPOGRAPHY.subtitle.fontWeight,
    },
});

export default ErrorState;