import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly LOCAL_KEY = 'my_contacts';
  constructor(

  ) { }

  public saveContact(contact: Contact): void {
    const existingContacts: Contact[] = this.getContacts();
    existingContacts.push(contact);
    this.storeContacts(existingContacts);
  }

  private storeContacts(contacts: Contact[]): void {
    localStorage.setItem(this.LOCAL_KEY, JSON.stringify(contacts));
  }

  public getContacts() {
    const ref = localStorage.getItem(this.LOCAL_KEY)
    return ref === null ? [] : JSON.parse(ref);
  }
}
