import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./partials/navbar/navbar.component";
import { FooterComponent } from "./partials/footer/footer.component";
import { ThemePickerComponent } from "./partials/theme-picker/theme-picker.component";
import { IndexComponent } from "./pages/index/index.component";
import { KeyboardComponent } from "./partials/keyboard/keyboard.component";
import { RecentPostsComponent } from "./partials/recent-posts/recent-posts.component";
import { HttpClientModule } from "@angular/common/http";
import { PostsComponent } from "./pages/posts/posts.component";
import { PostPaginatorComponent } from "./partials/post-paginator/post-paginator.component";
import { TruncatePipe } from "./pipes/truncate/truncate.pipe";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		FooterComponent,
		ThemePickerComponent,
		IndexComponent,
		KeyboardComponent,
		RecentPostsComponent,
		PostsComponent,
		PostPaginatorComponent,
		TruncatePipe,
		SignUpComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
