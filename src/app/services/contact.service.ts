import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly LOCAL_KEY = 'my_contacts';
  constructor() { }

  public saveContact(contact: Contact): void {
    const existingContacts: Contact[] = this.getContacts();
    existingContacts.push(contact);
    this.storeContacts(existingContacts);
  }

  private storeContacts(contacts: Contact[]): void {
    localStorage.setItem(this.LOCAL_KEY, JSON.stringify(contacts));
  }

  public getContacts(): Contact[] {
    const ref = localStorage.getItem(this.LOCAL_KEY)
    return ref === null ? [] : JSON.parse(ref);
  }

  public updateContactName(contactId: number, newName: string): void {
    const contacts = this.getContacts();
    contacts.forEach((contact: Contact) => {
      if (contact.id == contactId) {
        contact.name = newName;
      }
    });
    this.storeContacts(contacts);
  }

  public deleteContact(contact: Contact): void {
    const contacts = this.getContacts().filter(_contact => _contact.id != contact.id);
    this.storeContacts(contacts);
  }

  public addPhoneToContact(contactId: number, phone: string): boolean {
    let phoneAreadyExists = false;
    const contacts = this.getContacts();
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == contactId) {
        if (contacts[i].phones.indexOf(phone) === -1) {
          contacts[i].phones.push(phone);
          this.storeContacts(contacts);
          break;
        } else {
          phoneAreadyExists = true;
          break;
        }
      }
    }
    return !phoneAreadyExists;
  }

  public deletePhone(contactId: number, phone: string): void {
    const contacts = this.getContacts();
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == contactId) {

        contacts[i].phones.splice(
          contacts[i].phones.indexOf(phone),
          1
        );

        this.storeContacts(contacts);
        break;

      }
    }
  }

  public updatePhone(contactId: number, phone: string, newPhone: string): void {
    const contacts = this.getContacts();
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == contactId) {
        for (let phoneIndex = 0; phoneIndex < contacts[i].phones.length; phoneIndex++) {
          if (contacts[i].phones[phoneIndex] == phone) {
            contacts[i].phones[phoneIndex] = newPhone;
            this.storeContacts(contacts);
            break;
          }
        }
        break;
      }
    }
  }

  public contactNameExists(name: string) {
    return this.getContacts().filter(con => con.name === name).length > 0;
  }
}
