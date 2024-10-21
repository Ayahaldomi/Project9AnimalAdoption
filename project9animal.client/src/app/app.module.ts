import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { FooterComponent } from './home/footer/footer.component';
import { AbuotComponent } from './home/abuot/abuot.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    AbuotComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "abuot", component: AbuotComponent },


    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
   
 
})
export class AppModule { }
