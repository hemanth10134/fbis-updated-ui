import Header from "@/components/header"
import LoginForm from "@/components/login-form"
import Footer from "@/components/footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <LoginForm />
          
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}