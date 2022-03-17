import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ChronicleConfig } from "../../config/config";
import { PaginatedPosts } from "../../core/interfaces/api/posts";

@Injectable({
	providedIn: "root",
})
export class PostService {
	constructor(private http: HttpClient) {}
	/**
	 * Get the post with the limit and offset
	 * @param limit Number of elements to return
	 * @param offset Number of elements to offset
	 * @param cb Callback function (PaginatedPost[]|null, Error|null)
	 */
	getPosts(limit: number, offset: number, cb: Function) {
		const params = new HttpParams()
			.set("limit", limit)
			.set("offset", offset);

		this.http
			.get<PaginatedPosts>(`${ChronicleConfig.API}/posts`, { params })
			.subscribe((posts: PaginatedPosts) => {
				cb(posts, null);
			});
	}
}
