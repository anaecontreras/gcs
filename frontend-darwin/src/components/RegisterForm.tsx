"use client"

import type React from "react"

import { useState } from "react"
import authService from "../services/auth-service"
import axios from "axios"

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    email: "",
    password: "",
    password_confirmation: "",
    rol_id: "",
    unidad_operativa: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== formData.password_confirmation) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      await authService.register({
        nombre_completo: formData.nombre_completo,
        email: formData.email,
        password: formData.password,
        rol_id: Number(formData.rol_id),
        unidad_operativa: formData.unidad_operativa,
      })
      setSuccess("Usuario registrado exitosamente")
      window.location.href = "/"
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error al registrar usuario")
      } else {
        setError("Error al registrar usuario")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      {success && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="juan@gmail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mínimo 8 caracteres"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Repite tu contraseña"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select
            name="rol_id"
            value={formData.rol_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona un rol
            </option>
            <option value="1">Administrador</option>
            <option value="2">Supervisor</option>
            <option value="3">Operador</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unidad Operativa</label>
          <select
            name="unidad_operativa"
            value={formData.unidad_operativa}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona una unidad operativa
            </option>
            <option value="Caracas">Caracas</option>
            <option value="Camatagua">Camatagua</option>
            <option value="Baemari">Baemari</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition-colors font-medium"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  )
}