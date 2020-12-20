import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'primeng/fileupload';
import { LOCATION_INITIALIZED } from '@angular/common';
import { GalleryViewerComponent } from './gallery-viewer/gallery-viewer.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { GridGalleryComponent } from './gallery-viewer/grid-gallery/grid-gallery.component';
import { GridGalleryItemComponent } from './gallery-viewer/grid-gallery/grid-gallery-item/grid-gallery-item.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DropdownModule } from 'primeng/dropdown';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InstructionsComponent } from './instructions/instructions.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstructionMenuItemPipe } from './pipes/instruction-menu-item.pipe';
import { InstructionVideoComponent } from './instructions/instruction-video/instruction-video.component';
import { TranslationManagerComponent } from './admin-tools/translation-manager/translation-manager.component';
import { TreeTableModule } from 'primeng/treetable';
import { TranslationEditPipe } from './pipes/translation-edit.pipe';
import { SidebarModule } from 'primeng/sidebar';
import { BlockUIModule } from 'primeng/blockui';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageUploaderComponent } from './admin-tools/image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GalleryViewerComponent,
    AdminToolsComponent,
    GridGalleryComponent,
    GridGalleryItemComponent,
    InstructionsComponent,
    SafeUrlPipe,
    InstructionMenuItemPipe,
    InstructionVideoComponent,
    TranslationManagerComponent,
    TranslationEditPipe,
    ImageUploaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    ToolbarModule,
    DropdownModule,
    InputTextModule,
    GalleriaModule,
    FileUploadModule,
    PanelMenuModule,
    TreeTableModule,
    SidebarModule,
    BlockUIModule,
    DynamicDialogModule,
    FormsModule,
    MatGridListModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'instructions',
        component: InstructionsComponent,
        children: [
          {
            path: ':videoUrl',
            component: InstructionVideoComponent,
            //outlet: 'videoUrl'
          }
        ]
      },
      { path: 'gallery/:category', component: GalleryViewerComponent },
      { path: 'admin', component: AdminToolsComponent },
      { path: 'translation', component: TranslationManagerComponent }
    ])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  //return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  return new TranslateHttpLoader(http, 'https://localhost:5001/i18n/', '.json');
}

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = 'he'
      translate.setDefaultLang('en');
      translate.use(langToSet).subscribe(() => {
        console.info(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}
