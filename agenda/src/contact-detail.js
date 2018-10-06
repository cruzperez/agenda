import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';
import {areEqual} from './utility';

@inject(WebAPI)
export class ContactDetail {
  constructor(api){
    this.api = api;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.name);
      this.originalContact = JSON.parse(JSON.stringify(contact));
    });
  }

  get canSave() {
    return this.contact.name && this.contact.username && !this.api.isRequesting;
  }

  save() {
    this.api.saveContact(this.contact).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.name);
      this.originalContact = JSON.parse(JSON.stringify(contact));
    });
  }

  canDeactivate() {
    if (String(this.originalContact.name) != String(this.contact.name) ||
        String(this.originalContact.username) != String(this.contact.username) ||
        String(this.originalContact.email) != String(this.contact.email) ||
        String(this.originalContact.phone) != String(this.contact.phone)){
      return confirm('Tiene cambios sin guardar. ¿Está seguro que desea salir?');
    }

    return true;
  }
}
