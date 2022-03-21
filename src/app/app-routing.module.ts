import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { LoginComponent } from "./pages/login/login.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { UserEditComponent } from "./pages/user-edit/user-edit.component";

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
	},
	// {
	// 	path: "posts/new",
	// 	component: PostsComponent,
	// },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: "top" }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
