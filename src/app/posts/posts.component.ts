import { Component, OnInit } from "@angular/core";
import PaginatedPosts from "../core/interfaces/paginated-posts";
import { PostService } from "../services/post/post.service";

@Component({
	selector: "app-posts",
	templateUrl: "./posts.component.html",
	styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
	limit: number = 1;
	orderby: string = "desc";

	paginatedPosts?: PaginatedPosts;

	constructor(private postService: PostService) {}

	ngOnInit(): void {
		this.getPosts(1, this.limit, this.orderby);
	}

	/**
	 * Wrapper for postService
	 * @param page
	 * @param limit
	 * @param orderby
	 * @private
	 */
	private getPosts(page: number, limit: number, orderby: string): void {
		this.postService.getPosts(
			page,
			limit,
			orderby,
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
	 * Go to specific page.
	 * @param page
	 */
	public onGoTo(page: number): void {
		this.getPosts(page, this.limit, this.orderby);
	}

	/**
	 * Go to next page.
	 * @param page
	 */
	public onNext(page: number): void {
		this.getPosts(page + 1, this.limit, this.orderby);
	}

	/**
	 * Got to previous page.
	 * @param page
	 */
	public onPrev(page: number): void {
		this.getPosts(page - 1, this.limit, this.orderby);
	}
}
