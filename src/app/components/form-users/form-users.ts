import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';

interface UserForm  {
  name: FormControl<string | null> ;
  username: FormControl<string | null> ;
  email: FormControl<string | null> ;
}
@Component({
  selector: 'app-form-users',
  imports: [ReactiveFormsModule],
  templateUrl: './form-users.html',
  styleUrl: './form-users.scss',
})
export class FormUsers {
  addUserForm:FormGroup<UserForm> = new FormGroup<UserForm>({
    name: new FormControl<string | null>(null,[Validators.required]),
    username: new FormControl<string | null>(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9_]+$')]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
  });
  submitted = false;
  onSubmit() {
    let username = this.addUserForm.get('username')?.value;
    let email = this.addUserForm.get('email')?.value;
    let name = this.addUserForm.get('name')?.value;

    console.log(`Name: ${name?.trim()}, Username: ${username?.trim()}, Email: ${email?.trim()}`);
    console.log(this.addUserForm.value);
    this.submitted = true;
  }
}
