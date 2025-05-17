import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-task-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss'
})
export class EditTaskModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) {
    this.form = this.fb.group({
      title: [task.title],
      description: [task.description],
      assignedTo: [task.assignedTo],
      managerNotes: [task.managerNotes],
      operatorNotes: [task.operatorNotes],
      status: [task.status]
    });
  }

  save() {
    if (this.form.valid) {
      const updateTask = { ...this.task, ...this.form.value };
      this.dialogRef.close(updateTask);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
