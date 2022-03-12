import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { TokenService } from "../../services/token/token.service";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	constructor(
		public authService: AuthService,
		private tokenService: TokenService
	) {}

	ngOnInit(): void {}

	/**
	 * Handle logout
	 */
	onLogout(): void {
		this.tokenService.logout();
	}
}
