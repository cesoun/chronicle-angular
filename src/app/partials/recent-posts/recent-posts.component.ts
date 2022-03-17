import { Component, Input, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { PaginatedPosts } from "../../core/interfaces/api/posts";

@Component({
	selector: "app-recent-posts",
	templateUrl: "./recent-posts.component.html",
	styleUrls: ["./recent-posts.component.css"],
})
export class RecentPostsComponent implements OnInit {
	@Input() limit?: number;
	@Input() offset?: number;

	paginatedPosts?: PaginatedPosts;

	constructor(private postService: PostService) {}

	ngOnInit(): void {
		this.postService.getPosts(
			this.limit || 10,
			this.offset || 0,
			(pp: PaginatedPosts, err: Error | null) => {
				this.paginatedPosts = pp;
			}
		);
	}
}
