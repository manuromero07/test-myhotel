import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  /**
   * Constructor of the component
   * @param router property that handle the router actions
   */
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Method that navigate to the home page
   */
  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
