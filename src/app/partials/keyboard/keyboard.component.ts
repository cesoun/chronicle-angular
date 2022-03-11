import {
	Component,
	HostListener,
	OnInit,
	Renderer2,
	RendererFactory2,
} from "@angular/core";

@Component({
	selector: "app-keyboard",
	templateUrl: "./keyboard.component.html",
	styleUrls: ["./keyboard.component.css"],
})
export class KeyboardComponent implements OnInit {
	private renderer: Renderer2;

	constructor(private rFactory: RendererFactory2) {
		this.renderer = rFactory.createRenderer(null, null);
	}

	ngOnInit(): void {}

	@HostListener("document:keypress", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		const el = document.getElementById(event.key.toLowerCase());
		if (!el) return;

		// el.classList.toggle("kbd-lg");
		el.classList.toggle("bg-primary");
		setTimeout(
			(el: HTMLElement) => {
				el.classList.toggle("bg-primary");
			},
			150,
			el
		);
	}
}
