import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { matchValidator } from "../../core/validators/form-validators";

@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
	signupForm?: FormGroup;

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
	isInvalid: boolean = false;
	didError: boolean = false;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.signupForm = this.fb.group({
			username: [
				"",
				[
					Validators.required,
					Validators.pattern(this.usernamePattern),
					Validators.minLength(this.usernameMin),
					Validators.maxLength(this.usernameMax),
				],
			],
			email: ["", [Validators.required, Validators.email]],
			password: [
				"",
				[
					Validators.required,
					Validators.pattern(this.passwordPattern),
					Validators.minLength(this.passwordMin),
					Validators.maxLength(this.passwordMax),
					matchValidator("confirmPassword", true),
				],
			],
			confirmPassword: [
				"",
				[
					Validators.required,
					Validators.pattern(this.passwordPattern),
					Validators.minLength(this.passwordMin),
					Validators.maxLength(this.passwordMax),
					matchValidator("password"),
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
	public onSignup(): void {
		this.isBusy = true;

		if (!this.signupForm?.valid) {
			this.isInvalid = true;
			this.isBusy = false;
			return;
		}

		// TODO: Register our user.
		setTimeout(() => (this.isBusy = false), 1000, false);
	}
}
