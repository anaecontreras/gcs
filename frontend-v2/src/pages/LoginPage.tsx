"use client"

import { useState } from "react"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Sistema GCS</h1>
          <p className="text-white text-lg">Gestión de Contingencias Satelitales - CANTV</p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "login"
                  ? "bg-blue-600 text-white border-b-2 border-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "register"
                  ? "bg-blue-600 text-white border-b-2 border-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Registrarse
            </button>
          </div>

          <div className="p-6">{activeTab === "login" ? <LoginForm /> : <RegisterForm />}</div>
        </div>
      </div>
    </div>
  )
}