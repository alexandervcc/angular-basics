import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
  user = {
    name: "mijotron",
  };

  getName(){
    return this.user.name;
  }
}
