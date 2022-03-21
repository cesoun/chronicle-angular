import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserUpdate } from "../../core/interfaces/api/users";
import { ChronicleConfig } from "../../config/config";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private http: HttpClient) {}

	/**
	 * Get a User by Username
	 * @param username
	 */
	getUserByUsername(username: string): Observable<User> {
		return this.http.get<User>(
			`${ChronicleConfig.API}/user/username/${username}`
		);
	}

	putUserById(id: number, body: UserUpdate): Observable<object> {
		return this.http.put(`${ChronicleConfig.API}/user/id/${id}`, body);
	}
}
