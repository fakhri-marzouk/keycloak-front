import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SchoolComponent} from './components/school/school.component';
import {StudentComponent} from './components/student/student.component';
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "AppCompoement"},
  {path: 'student', component: StudentComponent, canActivate: [AuthGuard]},
  {path: "school", component: SchoolComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
