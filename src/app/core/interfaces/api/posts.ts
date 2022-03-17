export interface Post {
	id: number;
	author_id: number;
	title: string;
	content: string;
	created_at: Date;
	modified_at?: Date;
}

export interface PaginatedPosts {
	items: Post[];
	limit: number;
	offset: number;
	count: number;
}
