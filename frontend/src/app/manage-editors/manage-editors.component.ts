import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-manage-editors',
  templateUrl: './manage-editors.component.html',
  styleUrls: ['./manage-editors.component.css']
})
export class ManageEditorsComponent {

  searchTerm: string = '';
  allowDirectSubmission: Boolean = false;
  searchedUsers: { _id: string, fullname: string, email: string }[] = [];

  @Input() editors: { _id: string, fullname: string, email: string }[] = [];
  editors_Ids: string[] = [];

  @Output() updateEditorsEmitter: EventEmitter<any> = new EventEmitter<any>();

  userService = inject(UserService);
  routeService = inject(RouteService);

  ngOnInit() {
    this.allowDirectSubmission = (this.routeService.getCurrentURL() !== '/forms/create');
  }


  fetchUsers() {
    this.userService.fetchUsers(this.searchTerm).subscribe(
      (res: { message: string, users: { _id: string, fullname: string, email: string }[] }) => {
        console.log(res);
        this.searchedUsers = res.users.filter((user) => {
          const val = this.editors.findIndex((editor) => {
            return editor._id === user._id;
          })
          return val === -1;
        })
        // this.searchedUsers = res.users;
      },
      (errorRes) => {
        console.log(errorRes);
      }
    )
  }

  updateEditors() {
    console.log(this.editors);
    // for(let i=0;i<this.editors.length;i++) {
    //   this.editors[i] = this.editors[i]._id;
    // }

    this.editors_Ids = [];
    this.editors.forEach((editor) => {
      this.editors_Ids.push(editor._id);
    })
    console.log(this.editors_Ids);
    this.updateEditorsEmitter.emit(this.editors_Ids);
  }

  addToEditors(id: string, index: number) {
    if(
      this.editors.findIndex((editor) => {
        return editor._id === id;
      }) === -1
    ){
      this.editors.push(this.searchedUsers.splice(index, 1)[0]);
    }
  }

  removeFromEditors(id: string, index: number) {
    this.editors.splice(index, 1)[0];
  }
}
