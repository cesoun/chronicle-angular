interface Post {
	id: number;
	author_id: number;
	title: string;
	content: string;
	created_at: Date;
	modified_at?: Date;
}

export default Post;
