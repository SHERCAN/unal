import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'Libro Digital de Texto de Matemáticas Accesible e Interactivo',
  description: 'Plataforma educativa para mejorar habilidades matemáticas',
  icons: {
    icon: '/icon.webp',
    apple: '/icon.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
