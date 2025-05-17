import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  http = inject(HttpClient);
  API_URL_USERS = 'http://localhost:3000/users';
  API_URL_TASKS = 'http://localhost:3000/tasks';

  createUser(user:User): Observable<User> {
    return this.http.post<User>(this.API_URL_USERS,user);
  }

  updateUser(id: number, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.API_URL_USERS}/${id}`, data);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.API_URL_USERS}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL_USERS);
  }

  createTask(task:Task): Observable<Task>{
    return this.http.post<Task>(this.API_URL_TASKS,task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL_TASKS);
  }

  getCompleteTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL_TASKS}?status=completed`);
  }

  getApprovedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL_TASKS}?status=approved`);
  }

  approveTask(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.API_URL_TASKS}/${id}`, {status: 'approved'});
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.API_URL_TASKS}/${id}`);
  }

  assignTask(taskId: number, operatorId: number): Observable<Task> {
    return this.http.patch<Task>(`${this.API_URL_TASKS}/${taskId}`, {assignedTo: operatorId});
  }

  updateTask(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.API_URL_TASKS}/${id}`, data);
  }
}
