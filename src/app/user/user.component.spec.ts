import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { DataService } from "../shared/data.service";

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

  it("should not fetch data sucessfully if not called async", () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("Data")
    );

    fixture.detectChanges();

    //it will fail because is targeting to the state before the data arrives
    expect(app.data).toBe(undefined);
  });

  it("should not fetch data sucessfully if not called async", async(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("Data")
    );

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.data).toBe("Data");
    });
  }));

  it("should not fetch data sucessfully if not called async", fakeAsync(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("Data")
    );

    fixture.detectChanges();
    tick();
    expect(app.data).toBe("Data");
  }));
});

/*
  - if not using webpack, call '.compileComponents()'

  - to inject a service into the component
    - call 'injector.get(<service-class>)' on the component
  
  -to detect update of properties
    - fixture.detectChanges();

  -async: functionality to mock async calls such as http
    - creates an async testing environment
    - assures to handle as if the async part takes place
    - fixture.whenStable();
      - set the code execution for when the async tasks will have finished

  - fakeAsync()
    - tick(): finish now the async tasks

  -spyOn(): get access to classes, to listen to what is executed
    - so we can modify what is happening inside


*/
