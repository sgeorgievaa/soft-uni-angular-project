import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { CatalogComponent } from './features/catalog/catalog/catalog.component';
import { DetailsComponent } from './features/herbs/details/details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CreateComponent } from './features/herbs/create/create.component';
import { EditComponent } from './features/herbs/edit/edit.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
    //public
    { path: '', component: HomeComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'catalog/:id', component: DetailsComponent },
    
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    //private
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'dashboard', component: DashboardComponent },

    { path: '**', redirectTo: '' }


];
