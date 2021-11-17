import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Image,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import { ArwesThemeProvider, StylesBaseline, Text, Figure } from "@arwes/core"
import { AnimatorGeneralProvider, Animator } from "@arwes/animation"
import { Header } from "../core/components/Header"
import { NavigationProvider } from "../core/hooks/useNavigation"
import "../style.css"
import "notyf/notyf.min.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

const generalAnimator = { duration: { enter: 200, exit: 200 } }

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: '"Titillium Web", sans-serif' } }} />
      <AnimatorGeneralProvider animator={generalAnimator}>
        <NavigationProvider>
          <div
            style={{ padding: 16, minHeight: "100vh", display: "flex", flexDirection: "column" }}
          >
            <Header />
            <div style={{ flexGrow: 1 }}>
              <ErrorBoundary
                FallbackComponent={RootErrorFallback}
                onReset={useQueryErrorResetBoundary().reset}
              >
                {getLayout(<Component {...pageProps} />)}
              </ErrorBoundary>
            </div>
            <div style={{ textAlign: "right" }}>
              <a
                href="https://github.com/erikhofer/hacking-night"
                target="_blank"
                rel="noreferrer noopener"
              >
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  alt="GitHub Repo stars"
                  src="https://img.shields.io/github/stars/erikhofer/hacking-night?logo=github&style=flat-square"
                />
              </a>
            </div>
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
