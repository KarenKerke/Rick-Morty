import { Component, computed, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./characters/components/navbar/navbar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RickYMorty');
  constructor(public router: Router) {}

  hideNavbarRoutes = ['/Error404'];

  showNavbar = computed( () => {
    return !this.hideNavbarRoutes.includes(this.router.url);
  })


}


