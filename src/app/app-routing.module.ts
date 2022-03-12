import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";

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
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: "top" }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
