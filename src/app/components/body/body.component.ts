import { Component, OnInit } from '@angular/core';
import shortid from 'shortid';
import { init } from './helperTask';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  formArray = [...init()];
  condition = false;
  error = false;
  name: string;
  info: string;
  id: string;
  updateMode = false;

  constructor() {
    console.log(this.formArray);
    console.log(this.formArray.length > 0);
    if (this.formArray.length > 0) {
      this.condition = true;
    } else {
      this.condition = false;
    }
  }

  ngOnInit(): void {}

  handleSubmit(f) {
    if (f.value.name === undefined) {
      this.error = true;
      return;
    }

    if (!f.value.name.trim() || !f.value.info.trim()) {
      this.error = true;
      return;
    }

    this.error = false;
    this.formArray = [
      ...this.formArray,
      { id: shortid.generate(), ...f.value },
    ];

    localStorage.setItem('tasks', JSON.stringify(this.formArray));

    this.name = '';
    this.info = '';
    this.condition = true;
  }

  handleDelete(id: string) {
    const arrayFilter = this.formArray.filter((item) => item.id !== id);
    this.formArray = arrayFilter;
    if (this.formArray.length === 0) {
      this.condition = false;
    }
    localStorage.setItem('tasks', JSON.stringify(this.formArray));

  }

  handleUpdate({ name, info, id }) {
    this.name = name;
    this.info = info;
    this.id = id;
    this.updateMode = true;
  }

  editTask(name, info) {
    if (!name.trim() || !info.trim()) {
      this.error = true;
      return;
    }
    const arrayMap = this.formArray.map((item) =>
      item.id === this.id
        ? { id: this.id, name: this.name, info: this.info }
        : item
    );
    localStorage.setItem('tasks', JSON.stringify(arrayMap));

    this.formArray = arrayMap;
    this.name = '';
    this.info = '';
    this.updateMode = false;
    this.error = false;
  }
}
