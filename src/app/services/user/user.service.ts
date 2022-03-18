import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../core/interfaces/api/users";
import { ChronicleConfig } from "../../config/config";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private http: HttpClient) {}

	getUserByUsername(username: string): Observable<User> {
		return this.http.get<User>(
			`${ChronicleConfig.API}/user/username/${username}`
		);
	}
}
