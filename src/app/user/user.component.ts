import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  user: { name: string } = {
    name: undefined,
  };
  isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user.name = this.userService.getName();
  }
}
