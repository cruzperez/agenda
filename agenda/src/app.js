import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router){
    config.title = 'Contactos';
    config.map([
      { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Selección' },
      { route: 'contacts/:id',  moduleId: PLATFORM.moduleName('contact-detail'), name:'contactos' }
    ]);

    this.router = router;
  }
}
