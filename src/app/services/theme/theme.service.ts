import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import Theme from "../../core/interfaces/theme";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	private renderer: Renderer2;
	private theme: Theme;

	private themes: Theme[] = [
		{ name: "business", emoji: "💼" },
		{ name: "light", emoji: "🌝" },
		{ name: "dark", emoji: "🌚" },
	];

	constructor(private rFactory: RendererFactory2) {
		this.renderer = rFactory.createRenderer(null, null);
		this.theme = this.themes[0];
	}

	init(): void {
		this.getTheme();
		this.setTheme(this.theme);
	}

	getThemes(): Theme[] {
		return this.themes;
	}

	update(theme: Theme): void {
		this.setTheme(theme);
	}

	private setTheme(theme: Theme): void {
		this.theme = theme;
		localStorage.setItem("theme", theme.name);

		const html = document.documentElement;
		html.setAttribute("data-theme", this.theme.name);
	}

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
