'use client'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hi WebByte! I'd like to discuss a project.")
  return (
    <a
      href={`https://wa.me/919876543210?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm hidden sm:inline max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  )
}
