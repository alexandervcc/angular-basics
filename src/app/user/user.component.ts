import { Component, OnInit } from "@angular/core";
import { DataService } from "../shared/data.service";
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
  data: string;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.user.name = this.userService.getName();
    this.dataService.getDetails().then((d: string) => (this.data = d));
  }
}
