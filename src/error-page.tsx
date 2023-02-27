import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {isRouteErrorResponse(error) ? error.statusText : (error as Error).message}
        </i>
      </p>
    </div>
  )
}

export default ErrorPage