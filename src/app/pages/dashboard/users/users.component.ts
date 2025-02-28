import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users : any;
  user : any;
  loading : boolean = false;

  constructor(private _usersService : UsersService) {}

  ngOnInit() {
    this.loading = true;

    this._usersService.getUsers().subscribe((response) => {
      this.users = response;
      this.loading = false;
    });
  }

  view(user : any) {
    console.log(user);

    this.user = user;
  }

}
