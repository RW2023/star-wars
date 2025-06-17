const config = {
  darkMode: "class", // Enable class-based theme toggling
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: "var(--color-primary)",
            secondary: "var(--color-secondary)",
            accent: "var(--color-accent)",
            info: "var(--color-info)",
            background: "var(--color-background)",
            foreground: "var(--color-foreground)",
            surface: "var(--color-surface)",
            border: "var(--color-border)",
          },
    },
  },
};

export default config;