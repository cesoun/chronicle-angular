import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { PaginatedPosts } from "../../core/interfaces/api/posts";

@Component({
	selector: "app-posts",
	templateUrl: "./posts.component.html",
	styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
	limit: number = 10;
	offset: number = 0;

	paginatedPosts?: PaginatedPosts;

	constructor(private postService: PostService) {}

	ngOnInit(): void {
		this.getPosts(this.limit, this.offset);
	}

	/**
	 * Wrapper for postService
	 * @param limit
	 * @param offset
	 * @private
	 */
	private getPosts(limit: number, offset: number): void {
		this.postService.getPosts(limit, offset).subscribe({
			next: this.onSuccess.bind(this),
		});
	}

	/**
	 * Handler for Posts success.
	 * @param pp PaginatedPosts
	 * @private
	 */
	private onSuccess(pp: PaginatedPosts): void {
		this.paginatedPosts = pp;
	}

	/**
	 * Go to next offset.
	 */
	public onNext(): void {
		this.offset += this.limit;
		this.getPosts(this.limit, this.offset);
	}

	/**
	 * Got to previous offset.
	 */
	public onPrev(): void {
		this.offset -= this.limit;
		this.getPosts(this.limit, this.offset);
	}
}
