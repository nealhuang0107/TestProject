import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'development-tools',
        loadChildren: () => import('./pages/development-tools/development-tools.module').then(m => m.DevelopmentToolsPageModule)
    },
    {
        path: 'basic-installation',
        loadChildren: () => import('./pages/basic-installation/basic-installation.module').then(m => m.BasicInstallationPageModule)
    },
    {
        path: 'practice-sample',
        loadChildren: () => import('./pages/practice-sample/practice-sample.module').then(m => m.PracticeSamplePageModule)
    },
    {
        path: 'before-starting',
        loadChildren: () => import('./pages/before-starting/before-starting.module').then(m => m.BeforeStartingPageModule)
    },
    {
        path: 'new-project',
        loadChildren: () => import('./pages/new-project/new-project.module').then(m => m.NewProjectPageModule)
    },
    {
        path: 'data-binding',
        loadChildren: () => import('./pages/data-binding/data-binding.module').then(m => m.DataBindingPageModule)
    },
    {
        path: 'menu-webapi',
        loadChildren: () => import('./pages/menu-webapi/menu-webapi.module').then(m => m.MenuWebapiPageModule)
    },
    {
        path: 'new-page',
        loadChildren: () => import('./pages/new-page/new-page.module').then(m => m.NewPagePageModule)
    },
    {
        path: 'param-passing-receiving',
        loadChildren: () => import('./pages/param-passing-receiving/param-passing-receiving.module').then(m => m.ParamPassingReceivingPageModule)
    },
    {
        path: 'page-life-cycle',
        loadChildren: () => import('./pages/page-life-cycle/page-life-cycle.module').then(m => m.PageLifeCyclePageModule)
    },
    {
        path: 'common-controls',
        loadChildren: () => import('./pages/common-controls/common-controls.module').then(m => m.CommonControlsPageModule)
    },
    {
        path: 'popover-page',
        loadChildren: () => import('./pages/popover-page/popover-page.module').then(m => m.PopoverPagePageModule)
    },
    {
        path: 'use-ion-card',
        loadChildren: () => import('./pages/use-ion-card/use-ion-card.module').then(m => m.UseIonCardPageModule)
    },
    {
        path: 'how-debug',
        loadChildren: () => import('./pages/how-debug/how-debug.module').then(m => m.HowDebugPageModule)
    },
    {
        path: 'cb-rb-practice',
        loadChildren: () => import('./pages/cb-rb-practice/cb-rb-practice.module').then(m => m.CbRbPracticePageModule)
    },
    {
        path: 'my-calendar-practice',
        loadChildren: () => import('./pages/my-calendar-practice/my-calendar-practice.module').then(m => m.MyCalendarPracticePageModule)
    },
    {
        path: 'app-deploy',
        loadChildren: () => import('./pages/app-deploy/app-deploy.module').then(m => m.AppDeployPageModule)
    },
    {
        path: 'camera',
        loadChildren: () => import('./pages/camera/camera.module').then(m => m.CameraPageModule)
    },
    {
        path: 'camera-practice',
        loadChildren: () => import('./pages/camera-practice/camera-practice.module').then(m => m.CameraPracticePageModule)
    },
  {
    path: 'param-passing-list',
    loadChildren: () => import('./pages/param-passing-list/param-passing-list.module').then( m => m.ParamPassingListPageModule)
  },
  {
    path: 'param-receiving-edit/:id',
    loadChildren: () => import('./pages/param-receiving-edit/param-receiving-edit.module').then( m => m.ParamReceivingEditPageModule)
  },
  {
    path: 'param-receiving-edit',
    loadChildren: () => import('./pages/param-receiving-edit/param-receiving-edit.module').then( m => m.ParamReceivingEditPageModule)
  },
  {
    path: 'cb-rb-binding',
    loadChildren: () => import('./pages/cb-rb-binding/cb-rb-binding.module').then( m => m.CbRbBindingPageModule)
  },
  {
    path: 'my-calendar',
    loadChildren: () => import('./pages/my-calendar/my-calendar.module').then( m => m.MyCalendarPageModule)
  },
  {
    path: 'my-calendar-new',
    loadChildren: () => import('./pages/my-calendar-new/my-calendar-new.module').then( m => m.MyCalendarNewPageModule)
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
