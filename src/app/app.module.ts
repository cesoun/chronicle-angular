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
import { LoginComponent } from "./pages/login/login.component";
import { JwtModule } from "@auth0/angular-jwt";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";

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
		LoginComponent,
		UserProfileComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: () => {
					return localStorage.getItem("access_token");
				},
				allowedDomains: [new RegExp(`.*heckin.dev/?.*`)],
				// Ignoring domains is somewhat rough. We re-use them for get/put/post ...
				// For now, it will just strap up the token to everything when it can.
			},
		}),
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
