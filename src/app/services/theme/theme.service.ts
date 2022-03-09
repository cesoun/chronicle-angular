import {Injectable} from '@angular/core';
import Theme from "../../core/interfaces/theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themes: Theme[] = [
    {name: "business", emoji: "💼"},
    {name: "light", emoji: "🌝"},
    {name: "dark", emoji: "🌚"},
  ];

  theme: Theme;

  constructor() {
    this.theme = this.themes[0];
  }

  private setTheme(theme: Theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme.name)
  }

  private getTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      // Fallback to business if we can't find the theme.
      this.theme = this.themes.find((t: Theme) => t.name == storedTheme) || this.themes[0]
    } else {
      this.theme = this.themes[0];
    }
  }
}
