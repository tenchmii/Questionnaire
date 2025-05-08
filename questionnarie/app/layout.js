import './globals.css'

export const metadata = {
  title: "Questionnaire",
  description: "Questionnaire app"
};

export default function RootLayout({ children }){
  return(
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}