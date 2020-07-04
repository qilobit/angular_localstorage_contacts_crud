import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactBtnComponent } from './components/add-contact-btn/add-contact-btn.component';
import { ImportContactsBtnComponent } from './components/import-contacts-btn/import-contacts-btn.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SinglePhoneBadgeComponent } from './components/single-phone-badge/single-phone-badge.component';

@NgModule({
  declarations: [
    AppComponent,
    AddContactBtnComponent,
    ImportContactsBtnComponent,
    ContactsListComponent,
    SinglePhoneBadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
