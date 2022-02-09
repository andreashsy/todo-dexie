import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToDo } from './model';
import { ToDoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-dexie';

  form!: FormGroup
  todo!: ToDo
  titles: string[] = []

  constructor(private todoSvc: ToDoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(''),
      description: this.fb.control(''),
      priority: this.fb.control('low')
    })

  }

  add() {
    console.info("add button pressed!")
    this.todo = this.form.value as ToDo
    console.info("todo >>>", this.todo)
    this.todoSvc.add(this.todo)
      .then(id => {
        console.info('>>> id =', id)
        this.form.reset()
        return this.todoSvc.getAllTitles()
      })
      .then( result => {
        console.log(result)
      })
  }

  async getAllTitles() {
    console.info("all titles button pressed!")
    this.titles = await this.todoSvc.getAllTitles()
  }
}
