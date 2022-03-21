import { Pipe, PipeTransform } from "@angular/core";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * Unified applies remark to the string and returns stringify html.
 * Usage:
 *  value | unified:'element-id'
 * Example:
 *  {{ "# Markdown here" | unified }}
 *  formats to: "<h1>Markdown here</h1>"
 */
@Pipe({
	name: "unified",
})
export class UnifiedPipe implements PipeTransform {
	async transform(value: string, element: string): Promise<void> {
		// TODO: Angular hates us & navigates away from the page when using Fragments.
		// TODO: Adjust remark-toc?

		return new Promise<void>(async (resolve) => {
			const result = await unified()
				.use(remarkParse)
				.use(remarkGfm)
				.use(remarkToc, { prefix: "user-content-" })
				.use(remarkRehype)
				.use(rehypeExternalLinks)
				.use(rehypeSlug)
				.use(rehypeAutolinkHeadings)
				.use(rehypeSanitize)
				.use(rehypeStringify)
				.process(value);

			const el = document.getElementById(element)!;
			el.innerHTML = String(result.value);

			resolve();
		});
	}
}
