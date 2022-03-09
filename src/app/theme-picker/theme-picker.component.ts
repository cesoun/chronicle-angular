import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../services/theme/theme.service";

@Component({
	selector: "app-theme-picker",
	templateUrl: "./theme-picker.component.html",
	styleUrls: ["./theme-picker.component.css"],
})
export class ThemePickerComponent implements OnInit {
	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {}
}
