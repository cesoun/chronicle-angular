import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";

@Injectable({
	providedIn: "root",
})
export class IsAuthenticatedGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return new Observable<boolean>((obs) => {
			this.authService.isLoggedIn.subscribe({
				next: (isLoggedIn) => {
					if (!isLoggedIn) {
						this.router.navigate(["/login"]);
					} else {
						obs.next(true);
					}
				},
				error: console.log,
			});
		});
	}
}
