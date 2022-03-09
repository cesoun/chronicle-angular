import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { ThemePickerComponent } from "./theme-picker/theme-picker.component";
import { IndexComponent } from "./index/index.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		FooterComponent,
		ThemePickerComponent,
		IndexComponent,
		KeyboardComponent,
	],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
