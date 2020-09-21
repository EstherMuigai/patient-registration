import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from  '@angular/forms';
import { HttpClient } from '@angular/common/http';
import PouchDB from 'node_modules/pouchdb';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient
  ) { }

  pouchdb:any;
  registrationForm:FormGroup;
  username:string;
  password:string;
  remote:string;
  data = [];

  ngOnInit(): void {
    this.pouchdb = new PouchDB('mydb');

    this.username = 'Esther';
    this.password = 'n1mrod';
    this.remote = 'http://localhost:4200/mydb'

    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.username,
        password: this.password
      }
    };

    this.pouchdb.sync(this.remote, options);

    
    this.registrationForm = this.formBuilder.group({
      _id:[''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.getDocuments();
  }

    
  invalidFirstName()
  {
    return (this.registrationForm.controls.first_name.touched && this.registrationForm.controls.first_name.errors != null);
  }

  invalidLastName()
  {
    return (this.registrationForm.controls.first_name.touched && this.registrationForm.controls.last_name.errors != null);
  }

  invalidEmail()
  {
    return (this.registrationForm.controls.first_name.touched && this.registrationForm.controls.email.errors != null);
  }

  invalidPassword()
  {
    return (this.registrationForm.controls.first_name.touched && this.registrationForm.controls.password.errors != null);
  }

  onSubmit(){
    this.pouchdb.put(
      this.registrationForm.value,
      (err, res) => {
        if (err) {
          console.info('error creating new doc', err);
        }
        if (res) {
          console.info('new doc created', res);
        }
      }
    );
  }

  getDocuments() {
    return new Promise(resolve => {
      this.pouchdb.allDocs({
        include_docs: true,
        limit: 30,
        descending: true
      }).then((result) => {
        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
 
        this.data.reverse();

        resolve(this.data);

        console.log(this.data);
        
        this.pouchdb.changes({live: true, since: 'now', include_docs: 
          true}).on('change', (change) => {
              this.handleChange(change);
        });

      }).catch((error) => {
 
        console.log(error);
 
      }); 
 
    });
 
  }

   
  handleChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.data.forEach((doc, index) => {
 
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
 
    });
 
    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {
 
      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 
      //A document was added
      else {
        this.data.push(change.doc);                
      }
 
    }
 
  } 
 

}
