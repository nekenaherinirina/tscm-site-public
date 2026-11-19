import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Récupère le thème sauvegardé, ou utilise 'light' par défaut
    return localStorage.getItem('tscm-theme') || 'light';
  });

  useEffect(() => {
    // Applique le thème au body
    document.body.setAttribute('data-theme', theme);
    // Sauvegarde dans localStorage
    localStorage.setItem('tscm-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
