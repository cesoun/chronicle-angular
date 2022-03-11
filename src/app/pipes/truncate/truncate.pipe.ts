import { Pipe, PipeTransform } from "@angular/core";

/**
 * Truncate a string to a given length and optionally append ellipsis (...)
 * Usage:
 *  value | truncate:length,boolean
 * Example:
 *  {{ "really long string here" | truncate:3,true }}
 *  formats to: "rea..."
 */
@Pipe({
	name: "truncate",
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, length: number, ellipsis: boolean): string {
		if (value.length <= length) return value;

		const truncated: string = value.slice(0, length);
		return ellipsis ? truncated + "..." : truncated;
	}
}
