/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import React from 'react'
import ProtectedRoute from './config/ProtectedRoute.tsx'
import { Roles } from './config/roles.ts'
import Application from './pages/Application/index.tsx'
import Department from './pages/Department/index.tsx'
import Company from './pages/Company/index.tsx'
import Jobs from './pages/Jobs/index.tsx'
import UserKyc from './pages/UserKYC/index.tsx'
import Transactions from './pages/Transactions/index.tsx'
import Invoice from './pages/Invoice/index.tsx'
import Payroll from './pages/Payroll/index.tsx'
import JobOffer from './pages/JobOffer/index.tsx'
const AppShell = React.lazy(() => import('./components/app-shell'))
const Dashboard = React.lazy(() => import('./pages/dashboard'))
const Tasks = React.lazy(() => import('@/pages/tasks'))
const Chats = React.lazy(() => import('@/pages/chats'))
const Apps = React.lazy(() => import('@/pages/apps'))
const ComingSoon = React.lazy(() => import('@/components/coming-soon'))
const ExtraComponents = React.lazy(() => import('@/pages/extra-components'))

const Settings = React.lazy(() => import('./pages/settings'))
const Profile = React.lazy(() => import('./pages/settings/profile'))
const Account = React.lazy(() => import('./pages/settings/account'))
const Appearance = React.lazy(() => import('./pages/settings/appearance'))
const Notifications = React.lazy(() => import('./pages/settings/notifications'))
const Display = React.lazy(() => import('./pages/settings/display'))
const ErrorExample = React.lazy(() => import('./pages/settings/error-example'))

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-in-2',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in-2')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    element: (
      <ProtectedRoute requiredRole={Roles.ADMIN}>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<div>Loading Dashboard...</div>}>
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Dashboard />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <React.Suspense fallback={<div>Loading Tasks...</div>}>
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Tasks />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'applications',
        element: (
          <React.Suspense
            fallback={<div>Loading applications...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Application />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'Department',
        element: (
          <React.Suspense
            fallback={<div>Loading Department...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Department />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'company',
        element: (
          <React.Suspense
            fallback={<div>Loading company...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Company />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'transactions',
        element: (
          <React.Suspense
            fallback={<div>Loading transactions...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Transactions />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'invoice',
        element: (
          <React.Suspense
            fallback={<div>Loading invoice...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Invoice />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'payroll',
        element: (
          <React.Suspense
            fallback={<div>Loading payroll...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Payroll />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'job_offer',
        element: (
          <React.Suspense
            fallback={<div>Loading job_offer...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <JobOffer />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'Jobs',
        element: (
          <React.Suspense
            fallback={<div>Loading Jobs...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Jobs />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'user-kyc',
        element: (
          <React.Suspense
            fallback={<div>Loading UserKyc...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <UserKyc />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'chats',
        element: (
          <React.Suspense fallback={<div>Loading Chats...</div>}>
            <ProtectedRoute requiredRole={Roles.USER}>
              <Chats />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'apps',
        element: (
          <React.Suspense fallback={<div>Loading Apps...</div>}>
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Apps />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <React.Suspense fallback={<div>Loading Coming Soon...</div>}>
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <ComingSoon />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'analysis',
        element: (
          <React.Suspense fallback={<div>Loading Coming Soon...</div>}>
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <ComingSoon />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'extra-components',
        element: (
          <React.Suspense fallback={<div>Loading Extra Components...</div>}>
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <ExtraComponents />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <React.Suspense fallback={<div>Loading Settings...</div>}>
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Settings />
            </ProtectedRoute>
          </React.Suspense>
        ),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            element: (
              <React.Suspense fallback={<div>Loading Profile...</div>}>
                <Profile />
              </React.Suspense>
            ),
          },
          {
            path: 'account',
            element: (
              <React.Suspense fallback={<div>Loading Account...</div>}>
                <Account />
              </React.Suspense>
            ),
          },
          {
            path: 'appearance',
            element: (
              <React.Suspense fallback={<div>Loading Appearance...</div>}>
                <Appearance />
              </React.Suspense>
            ),
          },
          {
            path: 'notifications',
            element: (
              <React.Suspense fallback={<div>Loading Notifications...</div>}>
                <Notifications />
              </React.Suspense>
            ),
          },
          {
            path: 'display',
            element: (
              <React.Suspense fallback={<div>Loading Display...</div>}>
                <Display />
              </React.Suspense>
            ),
          },
          {
            path: 'error-example',
            element: (
              <React.Suspense fallback={<div>Loading Error Example...</div>}>
                <ErrorExample />
              </React.Suspense>
            ),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
