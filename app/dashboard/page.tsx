import Header from "@/components/header"
import Navbar from "@/components/navbar"
import DashboardBody from "@/components/dashboard-body"
import Footer from "@/components/footer"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <DashboardBody />

      {/* Footer */}
      <Footer />
    </div>
  )
}
