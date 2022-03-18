import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { User } from "../../core/interfaces/api/users";
import { ErrorResponse } from "../../core/interfaces/api/errors";
import { AuthService } from "../../services/auth/auth.service";
import { PaginatedPosts } from "../../core/interfaces/api/posts";
import { PostService } from "../../services/post/post.service";

@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
	user?: User;

	isLoadingUser?: boolean = true;
	isLoadingPosts?: boolean = true;
	didError?: boolean = false;
	errorMessage?: string = "";

	limit: number = 10;
	offset: number = 0;

	paginatedPosts?: PaginatedPosts;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private postService: PostService,
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
				next: this.onUserSuccess.bind(this),
				error: this.onUserError.bind(this),
			});
		});
	}

	/**
	 * Handler for User success.
	 * @param user
	 * @private
	 */
	private onUserSuccess(user: User): void {
		this.didError = false;
		this.isLoadingPosts = false;
		this.user = user;

		this.getPostsByAuthorId(user.id!, this.limit, this.offset);
	}

	/**
	 * Handler for User error.
	 * @param err
	 * @private
	 */
	private onUserError(err: any): void {
		if (err.status === 404) {
			this.didError = true;
			this.errorMessage = `no user found`;
		} else {
			const errRes: ErrorResponse = err.error as ErrorResponse;
			this.didError = errRes.error;
			this.errorMessage = errRes.msg;
		}

		this.isLoadingUser = false;
	}

	/**
	 * Wrapper for PostService
	 * @param authorId
	 * @param limit
	 * @param offset
	 * @private
	 */
	private getPostsByAuthorId(
		authorId: number,
		limit: number,
		offset: number
	): void {
		this.isLoadingPosts = true;
		this.postService.getPostsByAuthorId(authorId, limit, offset).subscribe({
			next: this.onPostSuccess.bind(this),
			// error: this.onPostError.bind(this),
		});
	}

	/**
	 * Handler for Posts success.
	 * @param pp
	 * @private
	 */
	private onPostSuccess(pp: PaginatedPosts): void {
		this.paginatedPosts = pp;
		this.isLoadingPosts = false;
	}

	/**
	 * Go to next offset.
	 */
	public onNext(): void {
		this.offset += this.limit;
		this.getPostsByAuthorId(this.user!.id!, this.limit, this.offset);
	}

	/**
	 * Got to previous offset.
	 */
	public onPrev(): void {
		this.offset -= this.limit;
		this.getPostsByAuthorId(this.user!.id!, this.limit, this.offset);
	}
}
