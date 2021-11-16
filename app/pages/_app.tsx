import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import { ArwesThemeProvider, StylesBaseline, Text, Figure } from "@arwes/core"
import { AnimatorGeneralProvider, Animator } from "@arwes/animation"
import { Header } from "../core/components/Header"
import { NavigationProvider } from "../core/hooks/useNavigation"
import "../style.css"
import "notyf/notyf.min.css"

const generalAnimator = { duration: { enter: 200, exit: 200 } }

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: '"Titillium Web", sans-serif' } }} />
      <AnimatorGeneralProvider animator={generalAnimator}>
        <NavigationProvider>
          <div style={{ padding: 16 }}>
            <Header />
            <ErrorBoundary
              FallbackComponent={RootErrorFallback}
              onReset={useQueryErrorResetBoundary().reset}
            >
              {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
          </div>
        </NavigationProvider>
      </AnimatorGeneralProvider>
    </ArwesThemeProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
