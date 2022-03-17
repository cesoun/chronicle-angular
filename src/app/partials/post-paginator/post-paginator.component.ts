import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "app-post-paginator",
	templateUrl: "./post-paginator.component.html",
	styleUrls: ["./post-paginator.component.css"],
})
export class PostPaginatorComponent implements OnInit {
	@Input() currentOffset: number = 0;
	@Input() currentLimit: number = 10;
	@Input() totalItems: number = 0;

	@Output() next: EventEmitter<number> = new EventEmitter<number>();
	@Output() prev: EventEmitter<number> = new EventEmitter<number>();

	constructor() {}

	ngOnInit(): void {}

	/**
	 * Emitter for the next page event.
	 */
	public onNext(): void {
		this.next.emit(this.currentOffset + this.currentLimit);
	}

	/**
	 * Emitter for the prev page event
	 */
	public onPrev(): void {
		this.prev.emit(this.currentOffset - this.currentLimit);
	}
}
