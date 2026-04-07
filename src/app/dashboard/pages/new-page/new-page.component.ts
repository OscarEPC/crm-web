import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/tasks.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {
  private fb = inject(FormBuilder);
  private isLoading: boolean = false;
  private tasksService = inject(TasksService);
  public taskId?: number;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private editing: boolean = false;
  private task!: Task;

  public taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    completed: [false],
  });

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.tasksService.getTaskById(id)))
      .subscribe((resp) => {
        if (!resp) return this.router.navigateByUrl('/admin/home');
        console.log('resp: ', resp)
        this.taskForm.reset(resp);
        this.taskId = resp.id;
        return;
      });
  }

  public get currentTask(): Task {
    return this.taskForm.value as Task;
  }
  
  submit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    if (this.taskId) {
      this.tasksService
        .updateTask({ ...this.currentTask, id: this.taskId })
        .subscribe({
          next: (resp: any) => {
            this.isLoading = false;
            Swal.fire({
              title: "Registro actualizado!",
              icon: "success",
              draggable: true
            });
            this.router.navigateByUrl('/dashboard/home');
          },
          error: (resp: any) => {
            this.isLoading = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo salio mal!",
            });
          },
        });
      return;
    }
    this.tasksService.createTask({ ...this.currentTask }).subscribe({
      next: (resp) => {
        this.isLoading = false;
        Swal.fire({
          title: "Registro creado!",
          icon: "success",
          draggable: true
        });
        this.router.navigateByUrl('/dashboard/home');
      },
      error: (resp) => {
        this.isLoading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
        });
      },
    });
  }
}
