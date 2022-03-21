import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostService } from "../../services/post/post.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { User } from "../../core/interfaces/api/users";
import { ErrorResponse } from "../../core/interfaces/api/errors";
import {
	Post,
	PostUpdate,
	PostUpdateFields,
} from "../../core/interfaces/api/posts";

@Component({
	selector: "app-blog-edit",
	templateUrl: "./blog-edit.component.html",
	styleUrls: ["./blog-edit.component.css"],
})
export class BlogEditComponent implements OnInit {
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
	post?: Post;
	user?: User;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private postService: PostService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.didError = false;
		this.isLoading = true;
		this.isInvalid = false;
		this.isBusy = true;

		this.route.paramMap.subscribe((p) => {
			const id = parseInt(p.get("id")!);
			if (!id) {
				return;
			}

			this.postService.getPostById(id).subscribe({
				next: this.getPostSuccess.bind(this),
				error: this.getPostError.bind(this),
			});
		});
	}

	/**
	 * Handle getPostById success.
	 * @param post
	 */
	getPostSuccess(post: Post): void {
		this.post = post;

		this.userService.getUserById(post.author_id).subscribe({
			next: this.getUserSuccess.bind(this),
			error: this.getUserError.bind(this),
		});
	}

	/**
	 * Handle getPostById error.
	 * @param err
	 */
	getPostError(err: any): void {
		if (err.status === 404 || err.status === 400) {
			this.errorMessage = `Post could not be found`;
		} else {
			const errMsg: ErrorResponse = err.error as ErrorResponse;
			this.errorMessage = errMsg.msg;
		}

		this.isLoading = false;
		this.didError = true;
	}

	/**
	 * Handler for getUserByUsername success
	 * @param user
	 */
	getUserSuccess(user: User): void {
		this.user = user;

		if (this.user?.username !== this.authService.getUsernameFromToken()) {
			this.errorMessage = "Post belongs to another user.";
			this.didError = true;

			this.isBusy = false;
			this.isLoading = false;
			return;
		}

		this.postForm = this.fb.group({
			title: [
				this.post?.title,
				[
					Validators.minLength(this.titleMin),
					Validators.maxLength(this.titleMax),
				],
			],
			content: [
				this.post?.content,
				[
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
	doUpdatePost(): void {
		this.isBusy = true;

		// Check form is valid.
		if (!this.postForm?.valid) {
			this.isInvalid = true;
			this.isBusy = false;
			return;
		}

		// Extract values.
		const { title, content } = this.postForm.value;

		// Reject if both aren't updating.
		if (!title && !content) {
			this.isInvalid = true;
			this.isBusy = false;
			return;
		}

		const fields: PostUpdateFields = { title, content };
		const update: PostUpdate = { new: fields };

		this.postService.putPostById(this.post!.id, update).subscribe({
			next: this.updatePostSuccess.bind(this),
			error: this.updatePostOrDeleteError.bind(this),
		});

		this.isBusy = false;
	}

	/**
	 * Handle createPost success.
	 * @param obj
	 */
	updatePostSuccess(obj: object): void {
		this.router.navigate(["/post", this.post!.id]);
	}

	/**
	 * Handle createPost error.
	 * @param err
	 */
	updatePostOrDeleteError(err: any): void {
		const errMsg: ErrorResponse = err.error as ErrorResponse;
		this.errorMessage = errMsg.msg;
		this.didError = true;
	}

	/**
	 * Handle for deletion.
	 */
	onPostDelete(): void {
		this.isBusy = true;

		// Confirm the User is trying to delete.
		if (!confirm("Are you sure? This action cannot be undone.")) {
			this.isBusy = false;
			return;
		}

		this.postService.deletePostById(this.post!.id).subscribe({
			next: this.onDeleteSuccess.bind(this),
			error: this.updatePostOrDeleteError.bind(this),
		});
	}

	/**
	 * Success Handler for onDelete
	 * @param obj
	 */
	onDeleteSuccess(obj: object): void {
		this.router.navigate([""]);
	}
}
