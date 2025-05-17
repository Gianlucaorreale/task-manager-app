import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Task } from '../../models/task';
import { ManagerService } from '../../core/manager.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-manager',
  imports: [],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  users: User[] = [];
  tasks: Task[] = [];

  managerService = inject(ManagerService);
  dialog = inject(MatDialog);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.managerService.getUsers().subscribe((data) => {
      this.users = data;
      console.log('dati: -->', data);
    });
    this.managerService.getTasks().subscribe((data) => (this.tasks = data));

    forkJoin([
      this.managerService.getTasks(),
      this.managerService.getUsers(),
    ]).subscribe(([tasks, users]) => {
      this.users = users;

      this.tasks = tasks.map((task) => {
        console.log('Task assignedTo:', task.assignedTo);
        console.log('Users:', users);

        const matchedUser = users.find((u) => Number(u.id) === task.assignedTo);
        console.log('Task:', task);
        console.log('Matched user:', matchedUser);

        return {
          ...task,
          assignedUsername: matchedUser?.username || 'Non assegnato',
        };
      }) as Task[];
    });
  }

  openEditUserModal(user: User) {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '400px',
      height: '400px',
      data: user, // passi l'oggetto con i dati dell'user alla modale
    });

    dialogRef.afterClosed().subscribe((updatedData: User) => {
      if (updatedData) {
        this.managerService
          .updateUser(updatedData.id, updatedData)
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }

  openEditTaskModal(task: Task) {
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      width: '700px',
      height: '700px',
      data: task, // passi l'oggetto con i dati del task alla modale
    });

    dialogRef.afterClosed().subscribe((updatedData: Task) => {
      if (updatedData) {
        this.managerService
          .updateTask(updatedData.id, updatedData)
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }
}
