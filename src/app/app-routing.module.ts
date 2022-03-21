import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { LoginComponent } from "./pages/login/login.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { UserEditComponent } from "./pages/user-edit/user-edit.component";
import { BlogCreateComponent } from "./pages/blog-create/blog-create.component";
import { IsAuthenticatedGuard } from "./guards/is-authenticated/is-authenticated.guard";
import { BlogViewComponent } from "./pages/blog-view/blog-view.component";
import { BlogEditComponent } from "./pages/blog-edit/blog-edit.component";

const routes: Routes = [
	{
		path: "",
		component: IndexComponent,
	},
	{
		path: "posts",
		component: PostsComponent,
	},
	{
		path: "signup",
		component: SignUpComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "profile/:username",
		component: UserProfileComponent,
	},
	{
		path: "profile/:username/edit",
		component: UserEditComponent,
		canActivate: [IsAuthenticatedGuard],
	},
	{
		path: "post/new",
		component: BlogCreateComponent,
		canActivate: [IsAuthenticatedGuard],
	},
	{
		path: "post/:id",
		component: BlogViewComponent,
	},
	{
		path: "post/:id/edit",
		component: BlogEditComponent,
		canActivate: [IsAuthenticatedGuard],
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: "top",
			anchorScrolling: "enabled",
			scrollOffset: [0, 25],
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
