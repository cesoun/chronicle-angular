import { Component, Input, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { PaginatedPosts } from "../../core/interfaces/api/posts";

@Component({
	selector: "app-recent-posts",
	templateUrl: "./recent-posts.component.html",
	styleUrls: ["./recent-posts.component.css"],
})
export class RecentPostsComponent implements OnInit {
	@Input() page?: number;
	@Input() limit?: number;
	@Input() orderby?: string;

	paginatedPosts?: PaginatedPosts;

	constructor(private postService: PostService) {}

	ngOnInit(): void {
		this.postService.getPosts(
			this.page || 1,
			this.limit || 10,
			this.orderby || "desc",
			(pp: PaginatedPosts, err: Error | null) => {
				this.paginatedPosts = pp;
			}
		);
	}
}
