import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from  '@angular/forms';
import PouchDB from 'node_modules/pouchdb';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder
  ) { }

  pouchdb:any;
  registrationForm:FormGroup;

  ngOnInit(): void {
    this.pouchdb = new PouchDB("pouchform");

    this.registrationForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

    
  invalidFirstName()
  {
    return (this.registrationForm.controls.first_name.errors != null);
  }

  invalidLastName()
  {
    return (this.registrationForm.controls.last_name.errors != null);
  }

  invalidEmail()
  {
    return (this.registrationForm.controls.email.errors != null);
  }

  invalidZipcode()
  {
    return (this.registrationForm.controls.zipcode.errors != null);
  }

  invalidPassword()
  {
    return (this.registrationForm.controls.password.errors != null);
  }

  onSubmit(){
    
  }


}
