import "./globals.css";
import type { Metadata } from "next";
import clsx from "clsx";
import { Nunito, Nunito_Sans } from "next/font/google";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";

import Header from "@/app/components/Header";
import Footer from "./components/Footer";

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

  const settings = await client.getSingle("settings"); 
      
  return {
    title: settings.data.site_title || "Flowrise fallback",
    description: settings.data.meta_description || "Flowrise is the relaxing app for you",

    openGraph: {
      images: [settings.data.og_image.url || ""],
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

        <Header />
        {children}
        <Footer /> 
        <div className="fixed bg-gradient-to-tr from-emerald-50 to-cyan-50 z-[-1] inset-0 " />        
        <PrismicPreview repositoryName={repositoryName}/>
      </body>
    </html>
  );
}
