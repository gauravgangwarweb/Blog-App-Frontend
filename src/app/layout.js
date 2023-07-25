import ReduxProvider from '@/redux/reduxProvider'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Blog</title>
        <script src="https://kit.fontawesome.com/b45a87b3cb.js" crossorigin="anonymous"></script>
      </head>
      <ReduxProvider>
        <body>
          <div>
            {children}
          </div>
        </body>
      </ReduxProvider>
    </html>
  )
}
