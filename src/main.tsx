import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'

import Root, { action as rootAction, loader as rootLoader } from './routes/root'
import ErrorPage from './error-page'
import Contact, { action as contactAction, loader as contactLoader } from './routes/contact'
import EditContact, { action as editAction } from './routes/edit'
import { action as destroyAction } from './routes/destroy'
import Index from './routes/index'

// This will enable client side routing for our web app
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);

/*
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction,
    loader: rootLoader,
    // Nested routes
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            action: contactAction,
            loader: contactLoader
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            action: editAction,
            loader: contactLoader
          },
          {
            path: 'contacts/:contactId/destroy',
            errorElement: <div>Oops! There was an error.</div>,
            action: destroyAction,
          }
        ]
      }
    ]
  }
])
*/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
