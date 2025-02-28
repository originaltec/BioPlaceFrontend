import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  constructor (private _usersService : UsersService) {}

  ngOnInit() {
   
   
  }

}

