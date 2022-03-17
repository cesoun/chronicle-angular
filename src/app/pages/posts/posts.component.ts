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
		this.postService.getPosts(
			limit,
			offset,
			this.getPostsCallback.bind(this)
		);
	}

	/**
	 * Callback wrapper for getPosts
	 * @param pp
	 * @param err
	 * @private
	 */
	private getPostsCallback(pp: PaginatedPosts, err: Error | null): void {
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
