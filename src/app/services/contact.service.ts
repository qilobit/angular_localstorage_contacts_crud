import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly LOCAL_KEY = 'my_contacts';
  constructor() { }

  public saveContact(contact: Contact): void {
    const allPhonesAreValid = contact.phones.filter(phone => Number.isNaN(Number(phone))).length === 0;
    if (contact.name !== '' && allPhonesAreValid) {
      const existingContacts: Contact[] = this.getContacts();
      existingContacts.push(contact);
      this.storeContacts(existingContacts);
    } else {
      throw 'El contacto contient teléfonos invalidos';
    }
  }

  private storeContacts(contacts: Contact[]): void {
    localStorage.setItem(this.LOCAL_KEY, JSON.stringify(contacts));
  }

  public getContacts(): Contact[] {
    const ref = localStorage.getItem(this.LOCAL_KEY)
    if (ref === null) {
      return [];
    }
    return JSON.parse(ref).map(c => new Contact(c.timestamp, c.name, c.phones));
  }

  public updateContactName(oldName: string, newName: string): void {
    const contacts = this.getContacts();
    contacts.forEach((contact: Contact) => {
      if (contact.name == oldName) {
        contact.name = newName;
      }
    });
    this.storeContacts(contacts);
  }

  public deleteContact(contact: Contact): void {
    const contacts = this.getContacts().filter(_contact => _contact.name !== contact.name);
    this.storeContacts(contacts);
  }

  public addPhoneToContact(contactName: string, phone: string): boolean {
    let phoneAreadyExists = false;
    const contacts = this.getContacts();
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name === contactName) {
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

  public deletePhone(contactName: string, phone: string): void {
    const contacts = this.getContacts();
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name == contactName) {

        contacts[i].phones.splice(
          contacts[i].phones.indexOf(phone),
          1
        );

        this.storeContacts(contacts);
        break;

      }
    }
  }

  public updatePhone(contactName: string, phone: string, newPhone: string): void {
    const contacts = this.getContacts();
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name === contactName) {
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
