import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../../services/post/post.service";
import { UserService } from "../../services/user/user.service";
import { Post } from "../../core/interfaces/api/posts";
import { User } from "../../core/interfaces/api/users";
import { ErrorResponse } from "../../core/interfaces/api/errors";
import { AuthService } from "../../services/auth/auth.service";

@Component({
	selector: "app-blog-view",
	templateUrl: "./blog-view.component.html",
	styleUrls: ["./blog-view.component.css"],
})
export class BlogViewComponent implements OnInit {
	isLoading: boolean = true;
	didError: boolean = false;

	errorMessage: string = "";

	user?: User;
	post?: Post;

	constructor(
		public authService: AuthService,
		private postService: PostService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.isLoading = true;
		this.didError = false;

		this.route.paramMap.subscribe((p) => {
			const id = parseInt(p.get("id")!);
			if (!id) {
				return;
			}

			this.postService.getPostById(id).subscribe({
				next: this.onPostSuccess.bind(this),
				error: this.onPostError.bind(this),
			});
		});
	}

	/**
	 * Handle getPostById success.
	 * @param post
	 */
	onPostSuccess(post: Post): void {
		this.post = post;

		this.userService.getUserById(post.author_id).subscribe({
			next: this.onUserSuccess.bind(this),
			error: this.onUserError.bind(this),
		});
	}

	/**
	 * Handle getPostById error.
	 * @param err
	 */
	onPostError(err: any): void {
		if (err.status === 404) {
			this.errorMessage = "Post not found...";
		} else {
			const errMsg: ErrorResponse = err.error as ErrorResponse;
			this.errorMessage = errMsg.msg;
		}

		this.didError = true;
	}

	/**
	 * Handle getUserById success.
	 * @param user
	 */
	onUserSuccess(user: User): void {
		this.user = user;
		this.isLoading = false;
	}

	/**
	 * Handle getUserById error.
	 * @param err
	 */
	onUserError(err: any): void {
		if (err.status === 404) {
			this.errorMessage = "Post not found...";
		} else {
			const errMsg: ErrorResponse = err.error as ErrorResponse;
			this.errorMessage = errMsg.msg;
		}

		this.didError = true;
	}
}
