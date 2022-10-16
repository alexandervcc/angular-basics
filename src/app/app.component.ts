import { Component } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0)",
        })
      ),
      state(
        "highlighted",
        style({
          backgroundColor: "blue",
          transform: "translateX(100px)",
        })
      ),
      transition("normal <=> highlighted", animate(300)),
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0) scale(1)",
        })
      ),
      state(
        "highlighted",
        style({
          backgroundColor: "blue",
          transform: "translateX(100px) scale(1)",
        })
      ),
      state(
        "shrunken",
        style({
          backgroundColor: "green",
          transform: "translateX(0) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", animate(500)),
      
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAnimate() {
    console.log("preseed animation");
    this.state = this.state === "normal" ? "highlighted" : "normal";
    this.wildState = this.wildState === "normal" ? "highlighted" : "normal";
  }

  onShrink() {
    this.wildState = "shrunken";
  }

  onAdd(item) {
    this.list.push(item);
  }
}

/*
  - to add animations: add tje animations config to the annotation
  - trigger() -> receives a name of the html to manipulate
    - in the htmal write as an attribute: [@divState]=""
    - the second arg is an array:
      - state() to configure states for the transition
        - pass the transition state name
        - also the function style()
          - it receives an {} of CSS styles
      - next to the state() elements add: transition() function
        - to tell the transition of CSS states
        - receives:
          - string of transition: 'st1 => st2'
          - animate()
            - receives a number of ms for the change to occur
  
  - to add a transition bidirectiional use <=>
  - to match any state use a wildcard: *
*/
