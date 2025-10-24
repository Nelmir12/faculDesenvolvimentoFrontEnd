import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  total=0; done=0; doing=0; late=0; next: Task[] = [];
  constructor(private tasks: TaskService, private subjects: SubjectService){}
  ngOnInit(){
    const list = this.tasks.getAll();
    this.total = list.length;
    this.done  = list.filter(t=>t.status==='done').length;
    this.doing = list.filter(t=>t.status==='doing').length;
    this.late  = list.filter(t=>t.status==='late').length;
    this.next  = [...list].sort((a,b)=>a.due.localeCompare(b.due)).slice(0,5);
  }
  subjectName(id:number){ return this.subjects.getById(id)?.name || '-'; }
}
