import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'activities' },
            { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './pages/form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './pages/bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './pages/grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './pages/bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './pages/blank-page/blank-page.module#BlankPageModule' },
            { path: 'members', loadChildren: './pages/members/members.module#MembersModule' },
            { path: 'profile', loadChildren: './pages/profile/profile.module#ProfileModule' },
            { path: 'activities', loadChildren: './pages/activities/activities.module#ActivitiesModule' },
            { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesModule' },
            { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
