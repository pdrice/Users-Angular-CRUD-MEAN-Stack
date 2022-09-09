import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  user:User
  constructor(private userService:UserService, 
    private router:Router, private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.user = new User()
    this.route.params.subscribe(params =>{
      let id = params.id;
      if(id !== undefined){
        this.userService.getUser(id).subscribe(res=>{
          this.user = res
        })
      }
    })
  }

  saveData(form:any){
   
    if(form.valid){
      if(this.user._id !==undefined){
        this.userService.updateUser(this.user).subscribe(res=>{
          if(res.status===200){
            this.router.navigate(['/']);
          }
        });
  
      }
      this.userService.addUser(this.user).subscribe(res=>{
        if(res.status===201){
          this.router.navigate(['/']);
        }
      });

    }
  }

}
