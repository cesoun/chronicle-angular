import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { TokenService } from "../../services/token/token.service";
import { TokenResponse } from "../../core/interfaces/api/tokens";
import { ErrorResponse } from "../../core/interfaces/api/errors";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
	loginForm?: FormGroup;

	usernameMin: number = 1;
	usernameMax: number = 16;
	usernamePattern: string = "[a-zA-Z0-9]{1,16}$";

	passwordMin: number = 8;
	passwordMax: number = 32;
	// https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/#:~:text=At%20least%20one%20digit%20%5B0,least%20one%20special%20character%20%5B*.!
	passwordPattern: string =
		"^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))).{8,32}$";

	showPassword: boolean = false;
	isBusy: boolean = false;
	isInvalid: boolean = false;
	didError: boolean = false;
	errorMessage: string = "";

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private tokenService: TokenService
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			username: [
				"",
				[
					Validators.required,
					Validators.pattern(this.usernamePattern),
					Validators.minLength(this.usernameMin),
					Validators.maxLength(this.usernameMax),
				],
			],
			password: [
				"",
				[
					Validators.required,
					Validators.pattern(this.passwordPattern),
					Validators.minLength(this.passwordMin),
					Validators.maxLength(this.passwordMax),
				],
			],
		});
	}

	/**
	 * Toggle the password text/password type
	 */
	public togglePassword(): void {
		this.showPassword = !this.showPassword;
	}

	/**
	 * Submit handler for form.
	 */
	public onLogin(): void {
		this.isBusy = true;

		if (!this.loginForm?.valid) {
			this.isInvalid = true;
			this.isBusy = false;
			return;
		}

		const username = this.loginForm.get("username")?.value;
		const password = this.loginForm.get("password")?.value;

		this.authService.login(username, password).subscribe({
			next: this.onSuccess.bind(this),
			error: this.onError.bind(this),
			complete: () => this.authService.setLoggedIn(true),
		});
	}

	/**
	 * Handler for registration success.
	 * @param token
	 * @private
	 */
	private onSuccess(token: TokenResponse): void {
		this.tokenService.saveToken(token.token);

		// TODO: Route to profile.
		this.router.navigate([""]);
	}

	/**
	 * Handler for registration error.
	 * @param err
	 * @private
	 */
	private onError(err: any): void {
		if (err.status === 404) {
			const errRes: ErrorResponse = err.error as ErrorResponse;
			this.didError = errRes.error;
			this.errorMessage = errRes.message;
		} else {
			this.didError = true;
			this.errorMessage = `Uh oh! A ${err.status} status code occurred...`;
		}

		this.isBusy = false;
	}
}
