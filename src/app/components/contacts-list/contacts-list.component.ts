import { Component, OnInit, Input, Output } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {
  @Input() contacts: Contact[] = [];
  @Output() contactAffected: EventEmitter<boolean> = new EventEmitter();
  editingContactName: FormControl = new FormControl('');
  newPhone: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  addingNewPhone: boolean = false;
  changesSub: Subscription;

  constructor(
    private readonly contactService: ContactService,
  ) { }

  edit(contact: Contact) {
    contact.isBeenEdited = true;
    this.editingContactName.setValue(contact.name);
  }

  update(contact: Contact) {
    if (this.editingContactName.value != '' && this.editingContactName.valid) {
      this.contactService.updateContactName(contact.name, this.editingContactName.value);
      this.emitContactAffected();
      this.cancelEdition(contact);
    }
  }

  delete(contact: Contact) {
    if (confirm('Estas seguro?')) {
      this.contactService.deleteContact(contact);
      this.emitContactAffected();
      this.cancelEdition(contact);
    }
  }

  cancelEdition(contact: Contact) {
    this.newPhone.setValue('');
    this.newPhone.reset();
    contact.isBeenEdited = false;
  }

  addPhone(contact: Contact) {
    if (this.newPhone.value != '' && this.newPhone.valid) {
      if (this.contactService.addPhoneToContact(contact.name, this.newPhone.value)) {
        this.newPhone.setValue('');
        contact.addingNewPhone = false;
        this.emitContactAffected();
      } else {
        alert('El teléfono ya existe');
      }
    }
  }

  emitContactAffected(): void {
    this.contactAffected.emit(true);
  }

}
