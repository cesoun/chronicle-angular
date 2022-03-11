import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from "@angular/core";

@Component({
	selector: "app-post-paginator",
	templateUrl: "./post-paginator.component.html",
	styleUrls: ["./post-paginator.component.css"],
})
export class PostPaginatorComponent implements OnInit, OnChanges {
	@Input() currentPage: number = 0;
	@Input() totalPages: number = 0;

	@Output() goTo: EventEmitter<number> = new EventEmitter<number>();
	@Output() next: EventEmitter<number> = new EventEmitter<number>();
	@Output() prev: EventEmitter<number> = new EventEmitter<number>();

	public pages: number[] = [];

	constructor() {}

	/**
	 * Check for changes, if there are any, update the pages array.
	 * @param changes
	 */
	ngOnChanges(changes: SimpleChanges): void {
		const currentPage = changes["currentPage"];
		const totalPages = changes["totalPages"];

		if (
			(currentPage && currentPage.currentValue) ||
			(totalPages && totalPages.currentValue)
		)
			this.pages = this.getPages(this.currentPage, this.totalPages);
	}

	ngOnInit(): void {}

	/**
	 * Emitter for the goTo page event.
	 * @param page
	 */
	public onGoTo(page: number): void {
		this.goTo.emit(page);
	}

	/**
	 * Emitter for the next page event.
	 */
	public onNext(): void {
		this.next.emit(this.currentPage);
	}

	/**
	 * Emitter for the prev page event
	 */
	public onPrev(): void {
		this.prev.emit(this.currentPage);
	}

	/**
	 * Returns a numbered array for the total number of pages available.
	 * @param current
	 * @param total
	 * @private
	 */
	private getPages(current: number, total: number): number[] {
		if (total <= 7) {
			return [...Array(total).keys()].map((x) => ++x);
		}

		if (current > 5) {
			if (current >= total - 4) {
				return [
					1,
					-1,
					total - 4,
					total - 3,
					total - 2,
					total - 1,
					total,
				];
			} else {
				return [1, -1, current - 1, current, current + 1, -1, total];
			}
		}

		return [1, 2, 3, 4, 5, -1, total];
	}
}
