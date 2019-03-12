import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  register = false;
  login = false;
  email: string;
  password: string;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        params.id === 'register' ? this.register = true : this.register = false;
        params.id === 'login' ? this.login = true : this.login = false;
        this.email = '';
        this.password = '';
      }
    );
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.register ? this.dataService.register(email, password) : this.dataService.login(email, password);
    this.router.navigate(['/manageData']);
  }

}
