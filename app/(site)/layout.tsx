import BodyLayout from '@/components/layout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <BodyLayout>{children}</BodyLayout>
}
