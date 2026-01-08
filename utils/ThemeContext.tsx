import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { DARK_COLORS, LIGHT_COLORS } from '../app/styles/theme';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
    colors: typeof LIGHT_COLORS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeMode>('light');

    // Load saved theme from storage on mount
    useEffect(() => {
        // In a real app, you would load from AsyncStorage
        // For now, we'll use a simple default
        const savedTheme = 'light' as ThemeMode;
        setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        // In a real app, save to AsyncStorage
        // await AsyncStorage.setItem('theme', newTheme);
    };

    const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Default export for Expo Router compatibility
export default ThemeContext;