import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseHorizontalNavigationComponent, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { ShortcutsComponent } from 'app/layout/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'modern-layout',
    templateUrl  : './modern.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [FuseLoadingBarComponent, NgIf, FuseVerticalNavigationComponent, FuseHorizontalNavigationComponent, MatButtonModule, MatIconModule, LanguagesComponent, FuseFullscreenComponent, SearchComponent, ShortcutsComponent, MessagesComponent, NotificationsComponent, UserComponent, RouterOutlet, QuickChatComponent],
})

export class ModernLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    //navigation: Navigation;

    userId: string;
    userType : string;


    private _unsubscribeAll: Subject<any> = new Subject<any>();
    userNavigation: { id: string; title: string; type: string; icon: string; link: string; }[];
    isAdmin: boolean;
   // navigation: { id: string; title: string; type: string; icon: string; link: string; }[];

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
    )
    {
        this.userId = sessionStorage.getItem('userId');
        this.userType = sessionStorage.getItem('userType');

        console.log('navigation',this.userType);

        this.isAdmin = this.userType === 'admin';
        console.log(this.isAdmin);
        this.navigation = this.isAdmin ? this.adminNavigation : this.ClientNavigation;
        console.log(this.navigation)

    }


    navigation= [

    ];





    adminNavigation= [
        
        // "compact": [
        //     {
        //         "id": "example",
        //         "title": "Logs",
        //         "type": "basic",
        //         "icon": "heroicons_outline:exclamation-triangle",
        //         "link": "/example"
        //     }
        // ],
        // "default": [
        //     {
        //         "id": "example",
        //         "title": "Logs",
        //         "type": "basic",
        //         "icon": "heroicons_outline:exclamation-triangle",
        //         "link": "/example"
        //     }
        // ],
        // "futuristic": [
        //     {
        //         "id": "example",
        //         "title": "Logs",
        //         "type": "basic",
        //         "icon": "heroicons_outline:exclamation-triangle",
        //         "link": "/example"
        //     }
        // ],
        // "horizontal": [
            {

                "id": "example",
                "title": "Home",
                "type": "basic",
                "icon": "heroicons_outline:home",
                "link": "/home"
            },
            {
                "id": "example",
                "title": "Error Logs",
                "type": "basic",
                "icon": "heroicons_outline:exclamation-triangle",
                "link": "/example"
            },
            
            {
                "id": "example",
                "title": "Create Project",
                "type": "basic",
                "icon": "heroicons_outline:plus-circle",
                "link": "/create-project"
            },
            {
                "id": "example",
                "title": "Create Client",
                "type": "basic",
                "icon": "heroicons_outline:plus-circle",
                "link": "/create-client"
            },
            {
                "id": "example",
                "title": "Client List",
                "type": "basic",
                "icon": "heroicons_outline:list-bullet",
                "link": "/client-list"
            },
            {
                "id": "example",
                "title": "Project List",
                "type": "basic",
                "icon": "heroicons_outline:list-bullet",
                "link": "/project-list"
            },
        
        
    
    ];

    ClientNavigation= [
        //{
        // "compact": [
        //     {
        //         "id": "example",
        //         "title": "Logs",
        //         "type": "basic",
        //         "icon": "heroicons_outline:exclamation-triangle",
        //         "link": "/example"
        //     }
        // ],
        // "default": [
        //     {
        //         "id": "example",
        //         "title": "Logs",
        //         "type": "basic",
        //         "icon": "heroicons_outline:exclamation-triangle",
        //         "link": "/example"
        //     }
        // ],
        // "futuristic": [
            // {
            //     "id": "example",
            //     "title": "Logs",
            //     "type": "basic",
            //     "icon": "heroicons_outline:exclamation-triangle",
            //     "link": "/example"
            // },
        // ],
        // "horizontal": [
            {
                "id": "example",
                "title": "Home",
                "type": "basic",
                "icon": "heroicons_outline:home",
                "link": "/home"
            },
            // {
            //     "id": "example",
            //     "title": "Error Logs",
            //     "type": "basic",
            //     "icon": "heroicons_outline:exclamation-triangle",
            //     "link": "/example"
            // },
            {
                "id": "example",
                "title": "Create Project",
                "type": "basic",
                "icon": "heroicons_outline:plus-circle",
                "link": "/create-project"
            },
           

        ];
       
    

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
       // Subscribe to navigation data
        // this._navigationService.navigation$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((navigation: Navigation) =>
        //     {
               

        //         console.log(navigation)
        //         //this.navigation = navigation;
        //     });
        this.userType = sessionStorage.getItem('userType');

       



        // this.navigation= [
        //     {
        //         "id": "example",
        //         "title": "Logs",
        //         "type": "basic",
        //         "icon": "heroicons_outline:chart-pie",
        //         "link": "/example"
        //     }
        // ]

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
