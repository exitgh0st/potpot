import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '../interfaces/status';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(private http: HttpClient) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${environment.apiUrl}/api/statuses`);
  }

  getStatus(id: string): Observable<Status> {
    return this.http.get<Status>(`${environment.apiUrl}/api/statuses/${id}`);
  }
}
