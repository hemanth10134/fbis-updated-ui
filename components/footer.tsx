export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-white/20 backdrop-blur-lg border-t border-white/40 text-blue-900 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto text-center">
          
          <p className="text-sm font-medium">
            © 2025 Factories and Boilers Information System. All rights reserved.
          </p>

          <p className="text-xs text-blue-700 mt-2">
            Designed & Developed by Karnataka Department of Factories, Boilers, Industrial Safety & Health
          </p>

          <div className="flex justify-center gap-6 mt-4 text-xs">
            <a href="#" className="text-blue-700 hover:text-blue-900 transition font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-900 transition font-medium">
              Terms of Service
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-900 transition font-medium">
              Contact Us
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
