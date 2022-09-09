import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment as env } from 'src/environments/environment';
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders;
  constructor(private client: HttpClient) {
    this.headers = new HttpHeaders({ 'content-type': 'application/json' })
  }

  getUsers(): Observable<User[]> {
    return this.client.get<User[]>(env.apiAddress + '/user')
  }

  getUser(id: string): Observable<User> {
    return this.client.get<User>(env.apiAddress + '/user/' + id)
  }

  addUser(user: User): Observable<HttpResponse<any>> {
    return this.client.post(env.apiAddress + '/user/', JSON.stringify(user), { headers: this.headers, observe: 'response' })
  }

  updateUser(user: User): Observable<HttpResponse<any>> {
    return this.client.put(env.apiAddress + '/user/' + user._id, JSON.stringify(user), {
      headers: this.headers, observe:
        'response'
    })
  }

  deleteUser(id: string): Observable<HttpResponse<any>> {
    return this.client.delete<HttpResponse<any>>(env.apiAddress + '/user/' + id, {
        observe:'response' })
  }


}
