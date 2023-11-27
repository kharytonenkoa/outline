import { Metadata } from "next"
import Link from "next/link"

import { ModeToggle } from "@/components/ThemeSwitch"
import LogoIcon from "@/components/icons/LogoIcon"
import AuthForm from "../../components/auth-form"

export const metadata: Metadata = {
  title: "Outline - Create and read millions of books, papers, fiction, etc.",
  description: "Create and read millions of books, papers, fiction, etc.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="flex flex-row gap-x-2 absolute right-4 top-4 md:right-8 md:top-8">
        <ModeToggle/>
        </div>
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 dark:bg-zinc-900 bg-blue-600" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <LogoIcon/>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Forget about books, articles, newspapers, encyclopedias. Now there is only a <span className="font-semibold ">Publication</span>.
              </p>
              <footer className="text-sm">Outline</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 absolute top-[9%] right-[5%]">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <AuthForm />
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}