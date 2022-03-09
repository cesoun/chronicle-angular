import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import Theme from "../../core/interfaces/theme";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	private theme: Theme;
	private themes: Theme[] = [
		{ name: "business", emoji: "💼" },
		{ name: "light", emoji: "🌝" },
		{ name: "dark", emoji: "🌚" },
	];

	constructor() {
		this.theme = this.themes[0];
	}

	/**
	 * Initializes the service by getting the last stored theme, or defaulting to
	 * the first theme in the themes array. Then the theme is set.
	 */
	init(): void {
		this.getTheme();
		this.setTheme(this.theme);
	}

	/**
	 * Get the themes available to set.
	 */
	getThemes(): Theme[] {
		return this.themes;
	}

	/**
	 * Update the current theme
	 * @param theme
	 */
	update(theme: Theme): void {
		this.setTheme(theme);
	}

	/**
	 * Set the theme locally as well as on the document.
	 * @param theme
	 * @private
	 */
	private setTheme(theme: Theme): void {
		this.theme = theme;
		localStorage.setItem("theme", theme.name);

		const html = document.documentElement;
		html.setAttribute("data-theme", this.theme.name);
	}

	/**
	 * Get the theme from the storage or fallback to the first theme in the themes
	 * array.
	 * @private
	 */
	private getTheme(): void {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme) {
			// Fallback to business if we can't find the theme.
			this.theme =
				this.themes.find((t: Theme) => t.name == storedTheme) ||
				this.themes[0];
		} else {
			this.theme = this.themes[0];
		}
	}
}
