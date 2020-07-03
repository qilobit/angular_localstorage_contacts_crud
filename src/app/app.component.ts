import { Component, OnInit } from '@angular/core';
import { ContactService } from './services/contact.service';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Prueba ATL Fabian';
  contacts: Contact[] = [];

  constructor(
    private readonly contactService: ContactService
  ) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    console.log('this.contacts ', this.contacts);
  }


  refresh() {
    this.contacts = this.contactService.getContacts();
  }
}
