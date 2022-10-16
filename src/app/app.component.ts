import { Component } from "@angular/core";
import {
  animate,
  keyframes,
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
      transition("shrunken <=> *", [
        style({
          backgroundColor: "orange",
        }),
        animate(
          1000,
          style({
            borderRadius: "50px",
          })
        ),
        animate(500),
      ]),
    ]),
    trigger("list1", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      transition("void => *", [
        //initial style: when appears
        style({
          opacity: 0,
          transform: "translateX(-100px)",
        }),
      ]),
      transition("* => void", [
        animate(
          300,
          style({
            transform: "translateX(100px)",
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger("list2", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({
              transform: "translateX(-100px)",
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: "translateX(-20px)",
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: "translateX(0px)",
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition("* => void", [
        animate(
          300,
          style({
            transform: "translateX(100px)",
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAnimate() {
    this.state = this.state === "normal" ? "highlighted" : "normal";
    this.wildState = this.wildState === "normal" ? "highlighted" : "normal";
  }

  onShrink() {
    this.wildState = "shrunken";
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item: string) {
    this.list = this.list.filter((e) => e !== item);
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
  - to add an in middle animation in the transition, add style to the animate()
  - to persist animations middle use an array as second arg to transition()

  - void: from no existing to a state 
    - use an entering animation, with no state
    - so use it when the DOM doesnt ahve the element, and you use an animation
      into adding the element in the DOM

  -keyframes(): allow to be more precise of styles to occur in some timing
    - to set the time for each phase, use 'offset' as css property
*/
