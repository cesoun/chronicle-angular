import { ApplicationRef, Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { UserService } from "../../services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { matchValidator } from "../../core/validators/form-validators";
import { User, UserUpdate } from "../../core/interfaces/api/users";
import { ErrorResponse } from "../../core/interfaces/api/errors";
import { TokenService } from "../../services/token/token.service";

@Component({
	selector: "app-user-edit",
	templateUrl: "./user-edit.component.html",
	styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
	settingsForm?: FormGroup;

	usernameMin: number = 1;
	usernameMax: number = 16;
	usernamePattern: string = "[a-zA-Z0-9]{1,16}$";

	passwordMin: number = 8;
	passwordMax: number = 32;
	// https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/#:~:text=At%20least%20one%20digit%20%5B0,least%20one%20special%20character%20%5B*.!
	passwordPattern: string =
		"^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))).{8,32}$";

	stdMin: number = 1;
	stdMax: number = 255;

	showPassword: boolean = false;
	isBusy: boolean = false;
	isLoadingUser: boolean = false;
	isInvalid: boolean = false;
	didError: boolean = false;
	errorMessage: string = "";

	user?: User;
	shouldLogout: boolean = false;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private tokenService: TokenService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.isBusy = true;
		this.isLoadingUser = true;

		this.route.paramMap.subscribe((p) => {
			const username: string | null = p.get("username");
			if (!username) return;

			this.userService.getUserByUsername(username).subscribe({
				next: this.onGetSuccess.bind(this),
				error: this.onGetError.bind(this),
			});
		});
	}

	/**
	 * Toggle the password visibility.
	 */
	togglePassword(): void {
		this.showPassword = !this.showPassword;
	}

	/**
	 * Handler for getUserByUsername success.
	 * @param user
	 */
	onGetSuccess(user: User): void {
		this.user = user;

		this.settingsForm = this.fb.group({
			username: [
				user.username,
				[
					Validators.pattern(this.usernamePattern),
					Validators.minLength(this.usernameMin),
					Validators.maxLength(this.usernameMax),
				],
			],
			firstname: [
				user.first_name,
				[
					Validators.minLength(this.stdMin),
					Validators.maxLength(this.stdMax),
				],
			],
			lastname: [
				user.last_name,
				[
					Validators.minLength(this.stdMin),
					Validators.maxLength(this.stdMax),
				],
			],
			// email: ["", [Validators.required, Validators.email]],
			password: [
				"",
				[
					Validators.required,
					Validators.pattern(this.passwordPattern),
					Validators.minLength(this.passwordMin),
					Validators.maxLength(this.passwordMax),
				],
			],
			newPassword: [
				"",
				[
					Validators.pattern(this.passwordPattern),
					Validators.minLength(this.passwordMin),
					Validators.maxLength(this.passwordMax),
					matchValidator("confirmNewPassword", true),
				],
			],
			confirmNewPassword: [
				"",
				[
					Validators.pattern(this.passwordPattern),
					Validators.minLength(this.passwordMin),
					Validators.maxLength(this.passwordMax),
					matchValidator("newPassword"),
				],
			],
		});

		this.didError = false;
		this.isInvalid = false;
		this.isBusy = false;
		this.isLoadingUser = false;
	}

	/**
	 * Handler for getUserByUsername error.
	 * @param err
	 */
	onGetError(err: any): void {
		if (err.status === 404) {
			this.errorMessage = "User not found.";
		} else {
			this.errorMessage = "Uh oh! Something went wrong...";
		}

		this.isLoadingUser = false;
		this.didError = true;
	}

	/**
	 * Handle the Update form submission.
	 */
	doUserUpdate(): void {
		this.isBusy = true;

		if (!this.settingsForm?.valid) {
			this.isInvalid = true;
		}

		const {
			username,
			firstname,
			lastname,
			password,
			newPassword,
			confirmNewPassword,
		} = this.settingsForm?.value;

		let userUpdate: UserUpdate = {
			new: {},
			password: password,
		};

		// Set username
		if (username && username != this.user?.username) {
			userUpdate.new.username = username;
			this.shouldLogout = true;
		}

		// Set password
		if (newPassword && confirmNewPassword) {
			userUpdate.new.password = newPassword;
			this.shouldLogout = true;
		}

		// Set firstname
		if (firstname != this.user?.first_name) {
			userUpdate.new.first_name = firstname;
		}

		// Set lastname
		if (lastname != this.user?.last_name) {
			userUpdate.new.last_name = lastname;
		}

		this.userService.putUserById(this.user!.id!, userUpdate).subscribe({
			next: this.onPutSuccess.bind(this),
			error: this.onPutError.bind(this),
		});
	}

	/**
	 * Handler for putUserById success.
	 * @param obj
	 */
	onPutSuccess(obj: object): void {
		if (this.shouldLogout) {
			this.tokenService.logout();
			this.authService.setLoggedIn(false);
			this.router.navigate(["/login"]);
		} else {
			this.router.navigate(["/profile", this.user?.username]);
		}
	}

	/**
	 * Handler for puUserById error.
	 * @param err
	 */
	onPutError(err: any): void {
		if (err.status === 401) {
			this.errorMessage = "Unauthorized, potential password mismatch";
		} else {
			const errMsg: ErrorResponse = err.error as ErrorResponse;
			this.errorMessage = errMsg.msg;
		}

		this.isBusy = false;
		this.didError = true;
	}
}
