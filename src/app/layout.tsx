import "./globals.css";
import type { Metadata } from "next";
import clsx from "clsx";
import { Nunito, Nunito_Sans } from "next/font/google";
import { createClient } from "@/prismicio";


const nunito = Nunito({
  subsets: ['latin'], // especifica o conjunto de caracteres que serão carregados.
  display: 'swap', // fallback enquanto não é carregada completamente. 
  variable: '--font-nunito', // é o nome da variavel que será usada para referenciar essa fonte no CSS .
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const page = await client.getSingle("settings"); 
      
  return {
    title: page.data.site_title || "Flowrise fallback",
    description: page.data.meta_description || "Flowrise is the relaxing app for you",

    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunitoSans.variable)}>
      <body>

        <header>Header!</header>
        {children}
        <footer>Fotter!</footer>
        
      
      </body>
    </html>
  );
}
