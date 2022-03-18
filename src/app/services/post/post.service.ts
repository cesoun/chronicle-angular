import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ChronicleConfig } from "../../config/config";
import { PaginatedPosts } from "../../core/interfaces/api/posts";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PostService {
	constructor(private http: HttpClient) {}
	/**
	 * Get the post with the limit and offset
	 * @param limit Number of elements to return
	 * @param offset Number of elements to offset
	 */
	getPosts(limit: number, offset: number): Observable<PaginatedPosts> {
		const params = new HttpParams()
			.set("limit", limit)
			.set("offset", offset);

		return this.http.get<PaginatedPosts>(`${ChronicleConfig.API}/posts`, {
			params,
		});
	}

	/**
	 * Get Posts by Author Id
	 * @param authorId Author Id
	 * @param limit Number of elements to return
	 * @param offset Number of elements to offset
	 */
	getPostsByAuthorId(
		authorId: number,
		limit: number,
		offset: number
	): Observable<PaginatedPosts> {
		const params = new HttpParams()
			.set("limit", limit)
			.set("offset", offset);

		return this.http.get<PaginatedPosts>(
			`${ChronicleConfig.API}/posts/author/${authorId}`,
			{ params }
		);
	}
}
