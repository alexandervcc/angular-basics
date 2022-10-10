import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceHolderDirective {
    constructor(public viewContainerRef:ViewContainerRef){

    }
}

/*
  - this will inject the ViewContianerRef
  - you get access to the place where to inject
*/