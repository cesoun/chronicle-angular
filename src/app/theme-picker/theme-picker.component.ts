import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../services/theme/theme.service";
import Theme from "../core/interfaces/theme";

@Component({
	selector: "app-theme-picker",
	templateUrl: "./theme-picker.component.html",
	styleUrls: ["./theme-picker.component.css"],
})
export class ThemePickerComponent implements OnInit {
	themes: Theme[] = [];

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.init();
		this.themes = this.themeService.getThemes();
	}

	/**
	 * Update the theme with the selected theme.
	 * @param theme
	 */
	updateTheme(theme: Theme): void {
		this.themeService.update(theme);
	}
}
