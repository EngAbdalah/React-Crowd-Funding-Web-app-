import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Apply theme colors as CSS variables */
    --color-primary: ${theme.colors.primary.main};
    --color-primary-light: ${theme.colors.primary.light};
    --color-primary-dark: ${theme.colors.primary.dark};
    --color-secondary: ${theme.colors.secondary.main};
    --color-background: ${theme.colors.background.default};
    --color-paper: ${theme.colors.background.paper};
    --color-card: ${theme.colors.background.card};
    --color-text-primary: ${theme.colors.text.primary};
    --color-text-secondary: ${theme.colors.text.secondary};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    background-color: var(--color-background);
    color: var(--color-text-primary);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
  }

  h1 { font-size: ${theme.typography.h1.fontSize}; }
  h2 { font-size: ${theme.typography.h2.fontSize}; }
  h3 { font-size: ${theme.typography.h3.fontSize}; }
  h4 { font-size: ${theme.typography.h4.fontSize}; }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  /* Links */
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: var(--color-primary-light);
    }
  }

  /* Buttons */
  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    background: none;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    transition: all ${theme.transitions.fast};
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: ${theme.typography.body1.fontSize};
    padding: ${theme.spacing.sm};
    border: 1px solid var(--color-border-main);
    border-radius: ${theme.borderRadius.sm};
    background-color: var(--color-paper);
    color: var(--color-text-primary);
    transition: border-color ${theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  /* Cards */
  .card {
    background-color: var(--color-card);
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.md};
  }

  /* Utility classes */
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-left { text-align: left; }

  .mt-1 { margin-top: ${theme.spacing.xs}; }
  .mt-2 { margin-top: ${theme.spacing.sm}; }
  .mt-3 { margin-top: ${theme.spacing.md}; }
  .mt-4 { margin-top: ${theme.spacing.lg}; }
  .mt-5 { margin-top: ${theme.spacing.xl}; }

  .mb-1 { margin-bottom: ${theme.spacing.xs}; }
  .mb-2 { margin-bottom: ${theme.spacing.sm}; }
  .mb-3 { margin-bottom: ${theme.spacing.md}; }
  .mb-4 { margin-bottom: ${theme.spacing.lg}; }
  .mb-5 { margin-bottom: ${theme.spacing.xl}; }

  /* RTL Support */
  [dir="rtl"] {
    text-align: right;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-border-main);
    border-radius: ${theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-border-dark);
  }
`; 