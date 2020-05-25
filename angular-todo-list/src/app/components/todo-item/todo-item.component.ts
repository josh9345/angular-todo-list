import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  // Set class
  setClasses() {
    let classes = {
      todo: true,
      isComplete: this.todo.completed,
    };

    return classes;
  }

  onToggle(todo) {
    // UI toggle
    todo.completed = !todo.completed;
    // Server toggle
    this.todoService.toggleCompleted(todo).subscribe((todo) => {
      console.log(todo);
    });
  }
  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}