import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import PaginatedPosts from "../../core/interfaces/paginated-posts";

@Injectable({
	providedIn: "root",
})
export class PostService {
	private API: string = "https://api.heckin.dev";

	constructor(private http: HttpClient) {}

	/**
	 * Get the posts with the page, limit and orderby query params.
	 * @param page What page to start from
	 * @param limit Number of elements to return
	 * @param orderby Ordering by 'created_date': asc,desc
	 * @param cb Callback function (PaginatedPost[]|null, Error|null)
	 */
	getPosts(page: number, limit: number, orderby: string, cb: Function) {
		const params = new HttpParams()
			.set("page", page)
			.set("limit", limit)
			.set("orderby", orderby);

		this.http
			.get<PaginatedPosts>(`${this.API}/post`, { params })
			.subscribe((posts: PaginatedPosts) => {
				cb(posts, null);
			});
	}
}
