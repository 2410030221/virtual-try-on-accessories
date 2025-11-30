import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { VirtualTryOnApp } from "./components/VirtualTryOnApp";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-rose-100/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-400 via-purple-500 to-pink-500 rounded-xl shadow-lg animate-float"></div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TryOn Studio
                </h1>
                <p className="text-xs text-gray-500 font-medium">Virtual Fashion Experience</p>
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Content />
      </main>
      
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(236, 72, 153, 0.2)',
          }
        }}
      />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-200 border-t-rose-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/20 to-purple-400/20 animate-pulse"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your fashion experience...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Authenticated>
        <VirtualTryOnApp />
      </Authenticated>
      
      <Unauthenticated>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="mb-12 animate-fadeInUp">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Virtual Try-On Experience
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover your perfect accessories with our AI-powered virtual try-on technology. 
              See how jewelry looks on you before you buy.
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-6">
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">✨</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-600">Advanced virtual try-on technology</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-6">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">💎</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Premium Collection</h3>
                <p className="text-sm text-gray-600">Curated luxury accessories</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mobile Ready</h3>
                <p className="text-sm text-gray-600">Perfect on any device</p>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-rose-100/50 max-w-md mx-auto">
              <SignInForm />
            </div>
          </div>
        </div>
      </Unauthenticated>
    </>
  );
}
