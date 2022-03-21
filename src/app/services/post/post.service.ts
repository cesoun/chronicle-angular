import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ChronicleConfig } from "../../config/config";
import {
	PaginatedPosts,
	Post,
	PostUpdate,
	PostUpdateFields,
} from "../../core/interfaces/api/posts";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PostService {
	constructor(private http: HttpClient) {}

	/**
	 * Create a new Post
	 * @param body PostUpdateFields containing title and content
	 */
	createPost(body: PostUpdateFields): Observable<object> {
		return this.http.post(`${ChronicleConfig.API}/post`, body);
	}

	/**
	 * Get a Post by Id
	 * @param id Id of the Post
	 */
	getPostById(id: number): Observable<Post> {
		return this.http.get<Post>(`${ChronicleConfig.API}/post/${id}`);
	}

	/**
	 * Update a Post by Id
	 * @param id Id of the Post to update
	 * @param body PostUpdate containing new PostUpdateFields
	 */
	putPostById(id: number, body: PostUpdate): Observable<object> {
		return this.http.put(`${ChronicleConfig.API}/post/${id}`, body);
	}

	/**
	 * Delete a Post by Id
	 * @param id Id of the Post to delete
	 */
	deletePostById(id: number): Observable<object> {
		return this.http.delete(`${ChronicleConfig.API}/post/${id}`);
	}

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

	/**
	 * Get posts by title & content query
	 * @param query String to look for
	 * @param limit Number of elements to return
	 * @param offset Number of elements to offset
	 */
	getPostsByQuery(
		query: string,
		limit: number,
		offset: number
	): Observable<PaginatedPosts> {
		const params = new HttpParams()
			.set("limit", limit)
			.set("offset", offset);

		return this.http.get<PaginatedPosts>(
			`${ChronicleConfig.API}/posts/search/${query}`,
			{ params }
		);
	}
}
