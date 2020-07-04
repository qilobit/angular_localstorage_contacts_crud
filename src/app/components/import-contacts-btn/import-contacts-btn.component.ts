import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

declare var $: any;

@Component({
  selector: 'import-contacts-btn',
  templateUrl: './import-contacts-btn.component.html',
  styleUrls: ['./import-contacts-btn.component.scss']
})
export class ImportContactsBtnComponent implements OnInit {
  private readonly VALID_FILE = 'application/json';
  private readonly MODAL_ID = '#preview-modal';
  _file: FormControl = new FormControl(null)
  previewContacts: Contact[] = [];
  @Output() contactsImported: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  validateFile(event: any): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (file.type === this.VALID_FILE && file.size <= 2000000) {
        const reader = new FileReader();
        reader.onload = (result) => {
          this.loadContactsFromJson(result.target.result.toString());
        };
        reader.readAsText(file);
      } else {
        this._file.setValue(null);
        alert('Archivo invalido, Solo se admite .json con tamaño máximo de 2mg');
      }
    }
  }

  loadContactsFromJson(jsonString: string) {
    try {
      const contacts: Contact[] = JSON.parse(jsonString);

      contacts.forEach(con => {
        if (this.contactService.contactNameExists(con.name)) {
          con.isInvalid = true;
        }
      });
      this.previewContacts = contacts;

      $(this.MODAL_ID).modal({
        keyboard: false,
        backdrop: false
      });
    } catch (e) {
      alert('Error al cargar contactos, verifique el formato y intentelo de nuevo');
      console.log(e);
    }
  }

  saveContacts(): void {
    this.previewContacts.forEach(contact => {
      if (!contact.isInvalid) {
        this.contactService.saveContact(contact);
      }
    });
    this.contactsImported.emit(true);
    this.closeModal();
  }

  closeModal(): void {
    this.previewContacts = [];
    $(this.MODAL_ID).modal('hide');
  }

}
