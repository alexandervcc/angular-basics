import { Component } from '@angular/core';
import { DataStorageService } from '../shared/directives/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private dataStorageService:DataStorageService) {}

  onSaveData(){
    this.dataStorageService.saveRecipes();
  }
}
