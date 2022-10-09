import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/User.model';
import { DataStorageService } from '../shared/directives/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub?: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; 
    });
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.getRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
