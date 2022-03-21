import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { UserService } from "../../services/user/user.service";
import { User } from "../../core/interfaces/api/users";
import { AuthService } from "../../services/auth/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorResponse } from "../../core/interfaces/api/errors";
import { PostUpdateFields } from "../../core/interfaces/api/posts";
import { Router } from "@angular/router";

@Component({
	selector: "app-blog-create",
	templateUrl: "./blog-create.component.html",
	styleUrls: ["./blog-create.component.css"],
})
export class BlogCreateComponent implements OnInit {
	didError: boolean = false;
	isLoading: boolean = true;
	isInvalid: boolean = false;
	isBusy: boolean = true;

	errorMessage: string = "";
	invalidMessage: string = "";

	titleMin: number = 5;
	titleMax: number = 255;

	contentMin: number = 30;
	contentMax: number = 65535;

	contentPlaceholder: string = `# Markdown support!`;

	postForm?: FormGroup;
	user?: User;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private postService: PostService,
		private router: Router,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.didError = false;
		this.isLoading = true;
		this.isInvalid = false;
		this.isBusy = true;

		const username = this.authService.getUsernameFromToken();

		this.userService.getUserByUsername(username).subscribe({
			next: this.getUserSuccess.bind(this),
			error: this.getUserError.bind(this),
		});
	}

	/**
	 * Handler for getUserByUsername success
	 * @param user
	 */
	getUserSuccess(user: User): void {
		this.user = user;

		this.postForm = this.fb.group({
			title: [
				"",
				[
					Validators.required,
					Validators.minLength(this.titleMin),
					Validators.maxLength(this.titleMax),
				],
			],
			content: [
				"",
				[
					Validators.required,
					Validators.minLength(this.contentMin),
					Validators.maxLength(this.contentMax),
				],
			],
		});

		this.isLoading = false;
		this.isBusy = false;
	}

	/**
	 * Handler for getUserByUsername error
	 * @param err
	 */
	getUserError(err: any): void {
		if (err.status === 404) {
			this.errorMessage = `User '${this.authService.getUsernameFromToken()}' could not be found`;
		} else {
			const errMsg: ErrorResponse = err.error as ErrorResponse;
			this.errorMessage = errMsg.msg;
		}

		this.didError = true;
	}

	/**
	 * Handle form submit.
	 */
	doPostCreate(): void {
		this.isBusy = true;

		// Check form is valid.
		if (!this.postForm?.valid) {
			this.isInvalid = true;
			this.isBusy = false;
			return;
		}

		// Extract values.
		const { title, content } = this.postForm.value;
		const fields: PostUpdateFields = { title, content };

		// Create the Post.
		this.postService.createPost(fields).subscribe({
			next: this.createPostSuccess.bind(this),
			error: this.createPostError.bind(this),
		});

		this.isBusy = false;
	}

	/**
	 * Handle createPost success.
	 * @param obj
	 */
	createPostSuccess(obj: object): void {
		// TODO: Update API and redirect with new post.
		this.router.navigate(["/profile", this.user?.username]);
	}

	/**
	 * Handle createPost error.
	 * @param err
	 */
	createPostError(err: any): void {
		const errMsg: ErrorResponse = err.error as ErrorResponse;
		this.errorMessage = errMsg.msg;
		this.didError = true;
	}
}
