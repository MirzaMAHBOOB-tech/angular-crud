import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    standalone: false
})
export class UserComponent implements OnInit {
  users: any[] = [];
  newUser: any = { name: '', lastname: '', email: '', age: '', gender: '', address: '' };
  successMessage: string = '';
  errorMessage: string = '';
  editIndex: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  addUser(): void {
    if (!this.newUser.name || !this.newUser.lastname || !this.newUser.email || !this.newUser.age || !this.newUser.gender || !this.newUser.address) {
      this.errorMessage = 'All fields are required!';
      this.successMessage = '';
      setTimeout(() => {
        this.errorMessage = '';
      }, 1000);
      return;
    }

    if (this.editIndex === null) {
      this.userService.addUser(this.newUser);
      this.successMessage = 'User added successfully!';
    } else {
      this.userService.updateUser(this.newUser, this.editIndex);
      this.successMessage = 'User updated successfully!';
      this.editIndex = null; // Reset after update
    }

    this.errorMessage = '';
    // Reset form
    this.newUser = { name: '', lastname: '', email: '', age: '', gender: '', address: '' };

    setTimeout(() => {
      this.successMessage = '';
    }, 1000);
    
  }

  deleteUser(index: number): void {
    this.userService.deleteUser(index);
  }

  updateUser(user: any, index: number): void {
    this.newUser = { ...user }; 
    this.editIndex = index; 
  }
}
