import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserComponent } from "./user.component";
import { UserService } from "./user.service";

describe("UserComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
    });
  }));

  it("should create the app", async(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it("should use the username from the service", () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;

    //inject service
    let userService = fixture.debugElement.injector.get(UserService);
    //change detection
    fixture.detectChanges();

    expect(userService.user.name).toEqual(app.user.name);
  });

  it("NOT display username if logged in", () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p")).not.toContain(app.user.name);
  });

  it("display username if logged in", () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    app.isLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p").textContent).toContain(app.user.name);
  });
});

/*
  - if not using webpack, call '.compileComponents()'

  - to inject a service into the component
    - call 'injector.get(<service-class>)' on the component
  
  -to detect update of properties
    - fixture.detectChanges();
*/
