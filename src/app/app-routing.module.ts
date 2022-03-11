import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { PostsComponent } from "./posts/posts.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

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
