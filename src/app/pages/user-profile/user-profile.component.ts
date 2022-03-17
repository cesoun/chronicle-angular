import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { User } from "../../core/interfaces/api/users";
import { ErrorResponse } from "../../core/interfaces/api/errors";
import { AuthService } from "../../services/auth/auth.service";

@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
	user?: User;

	isLoading?: boolean = true;
	didError?: boolean = false;
	errorMessage?: string = "";

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		public authService: AuthService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((paramMap) => {
			const username = paramMap.get("username");
			if (!username) {
				// TODO: Redirect to error if we can't find the supplied user.
				this.router.navigate([""]);
				return;
			}

			this.userService.getUserByUsername(username).subscribe({
				next: this.onSuccess.bind(this),
				error: this.onError.bind(this),
			});
		});
	}

	private onSuccess(user: User): void {
		this.didError = false;
		this.user = user;
	}

	private onError(err: any): void {
		if (err.status === 404) {
			this.didError = true;
			this.errorMessage = `no user found`;
		} else {
			const errRes: ErrorResponse = err.error as ErrorResponse;
			this.didError = errRes.error;
			this.errorMessage = errRes.msg;
		}

		this.isLoading = false;
	}
}
