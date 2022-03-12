import Pagination from "../pagination";

export interface Post {
	id: number;
	author_id: number;
	author_username?: string;
	author_first?: string;
	author_last?: string;
	title: string;
	content: string;
	created_at: Date;
	modified_at?: Date;
}

export interface PaginatedPosts {
	posts: Post[];
	pagination: Pagination;
}
