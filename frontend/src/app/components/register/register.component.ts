import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { emailDomainValidator } from '../../validators/email'; // นำเข้า custom validator

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(2)], // ตรวจสอบให้มีความยาวขั้นต่ำ 2 ตัวอักษร
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(2)], // ตรวจสอบให้มีความยาวขั้นต่ำ 2 ตัวอักษร
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          emailDomainValidator([
            'gmail.com',
            'hotmail.com',
            'hotmail.co.th',
            'outlook.com',
          ]),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)], // ตรวจสอบให้มีความยาวขั้นต่ำ 6 ตัวอักษร
      ],
      gender: ['', [Validators.required]], // Added gender field
    });
  }

  submit(): void {
    if (this.form.invalid) {
      // Display error message for all invalid fields
      Swal.fire('Error', 'Please fill out all required fields.', 'error');
      return;
    }

    const user = this.form.getRawValue(); // Get form data as an object
    console.log(user);

    this.http
      .post('http://localhost:5000/api/register', user, {
        withCredentials: true,
      })
      .subscribe(
        () => {
          Swal.fire('Success', 'Registration successful!', 'success');
          this.router.navigate(['/login']); // Redirect to login page on success
        },
        (err) => {
          // Handle specific server errors (if provided by API)
          if (err.error && err.error.message) {
            Swal.fire('Error', err.error.message, 'error');
          } else {
            // Generic error message for unexpected errors
            Swal.fire(
              'Error',
              'An error occurred during registration.',
              'error'
            );
          }
        }
      );
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
