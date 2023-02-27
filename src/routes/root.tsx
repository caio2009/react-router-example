import { useEffect } from 'react'
import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom'
import { getContacts, createContact } from '../contacts'

export async function loader({ request }: { request: any }) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)
  return { contacts, q }
}

export async function action() {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

const Root = () => {
  const navigation = useNavigation()
  const { contacts, q } = useLoaderData() as { contacts: any, q: string }
  const submit = useSubmit()

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const inputSearchEl = document.getElementById('q') as HTMLInputElement
    if (inputSearchEl) inputSearchEl.value = q
  }, [q])

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const isFirstSearch = q == null
                submit(e.currentTarget.form, { replace: !isFirstSearch })
              }}
              className={searching ? 'loading' : ''}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {/* The Link component enable the client side routing.  */}
              {/* It avoid the browser to do a full document request for the next URL. */}
              {contacts.map((contact: any) => (
                <li key={contact.id}>
                  <NavLink 
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }: { isActive: any; isPending: any}) => {
                      return isActive 
                        ? 'active'
                        : isPending
                        ? 'pending'
                        : ''
                    }}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  )
}

export default Root