import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserComponent } from "./user.component";

describe("UserComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();
  }));

  it("should create the app", async(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.nativeElement;
    expect(app).toBeTruthy();
  }));
});

/*
  - if not using webpack, call '.compileComponents()'

*/
