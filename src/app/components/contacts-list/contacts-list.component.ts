import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  @Input() contacts: Contact[] = [];

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
