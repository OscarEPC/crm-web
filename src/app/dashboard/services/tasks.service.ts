import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/tasks.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl: string = `${environment.apiUrl}/tasks`;
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  
  constructor() { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }


  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`, { headers: this.getHeaders() })
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/`, { ...task, user_id: this.authService._currentUser()?.id }, { headers: this.getHeaders() });
  }

  public updateTask(task: Task): Observable<Task> {
    const { id, ...newTask } = task;
    return this.http.put<Task>(`${this.baseUrl}/${id}`, newTask, { headers: this.getHeaders() });
  }

  public getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
