import Post from "./post";
import Pagination from "./pagination";

interface PaginatedPosts {
	posts: Post[];
	pagination: Pagination;
}

export default PaginatedPosts;
