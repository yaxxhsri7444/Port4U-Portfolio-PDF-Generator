import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(App,{ ...appConfig,
  providers:[
    importProvidersFrom(HttpClientModule),
    ...(appConfig.providers || []),
  ]
})
  .catch((err) => console.error(err));
