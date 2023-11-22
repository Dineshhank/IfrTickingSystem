import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { TicketsListComponent } from './modules/landing/tickets-list/tickets-list.component';
import { CreateTicketComponent } from './modules/landing/create-ticket/create-ticket.component';
import { ViewTicketsComponent } from './modules/landing/view-tickets/view-tickets.component';
import { CreateProjectComponent } from './modules/landing/create-project/create-project.component';
import { ViewAllClientsComponent } from './modules/landing/view-all-clients/view-all-clients.component';
import { ViewAllProjectsComponent } from './modules/landing/view-all-projects/view-all-projects.component';
import { CreateClientComponent } from './modules/landing/create-client/create-client.component';
import { ViewClientComponent } from './modules/landing/view-client/view-client.component';
import { ViewProjectComponent } from './modules/landing/view-project/view-project.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'external'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'sign-in'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children: [
    //         {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
    //     ]
    // },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes')},
            {path: 'ticket-list', component: TicketsListComponent},
            {path: 'create-ticket', component:CreateTicketComponent },
            {path: 'view-ticket', component:ViewTicketsComponent},
            {path: 'create-project' , component:CreateProjectComponent},
            {path: 'client-list' , component:ViewAllClientsComponent},
            {path: 'project-list' , component:ViewAllProjectsComponent},
            {path: 'create-client' , component:CreateClientComponent},
            {path: 'view-client' , component:ViewClientComponent},
            {path:'view-project' , component:ViewProjectComponent}
        ]
    }
];

