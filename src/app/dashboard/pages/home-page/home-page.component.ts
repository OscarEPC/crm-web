import { Component, computed, inject, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/tasks.interface';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  private authService = inject(AuthService);
  private tasksService = inject(TasksService);
  public isLoading: boolean = false;
  public tasks: Task[] = [];
  
  public currentUser = computed(() => this.authService._currentUser());
  
  public logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.tasksService.getTasks()
      .subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.tasks = resp;
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }

  deleteTask(task: Task): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la tarea ${task.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasksService.deleteTask(task.id!).subscribe({
          next: () => {
            Swal.fire('Eliminado!', `${task.title} ha sido eliminado.`, 'success');
            this.tasks = this.tasks.filter(taskRecord => {
              return taskRecord.id !== task.id
            });
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar la tarea', 'error');
            console.error(err);
          }
        });
      }
    });
  }
}
