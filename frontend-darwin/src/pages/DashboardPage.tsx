"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../context/AuthContext"
import LogsActivityTable from "../components/LogsActivityTable"
import LogsActivityFilters from "../components/LogsActivityFilters"
import logsActivityService from "../services/logs-activity-service"
import type { LogActivity } from "../types"

interface FilterParams {
  fecha_inicio: string
  fecha_fin: string
  modulo?: string
  tipo_operacion?: string
}

export default function DashboardPage() {
  const { usuario, logout } = useAuth()
  const [logs, setLogs] = useState<LogActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"mis" | "todas">("mis")

  const loadLogs = useCallback(async () => {
    setLoading(true)
    try {
      const response =
        viewMode === "mis" ? await logsActivityService.getMisActividades() : await logsActivityService.getTodas()
      setLogs(response.data.data)
    } catch (error) {
      console.error("Error cargando logs:", error)
    } finally {
      setLoading(false)
    }
  }, [viewMode])

  useEffect(() => {
    loadLogs()
  }, [loadLogs])

  const handleFilter = async (params: FilterParams) => {
    setLoading(true)
    try {
      const response = await logsActivityService.filtrar(params)
      setLogs(response.data.data)
    } catch (error) {
      console.error("Error filtrando logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    loadLogs()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard GCS</h1>
            <p className="text-sm text-gray-600">Gestión de Contingencias Satelitales - {usuario?.nombre_completo}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setViewMode("mis")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === "mis"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Mis Actividades
          </button>
          <button
            onClick={() => setViewMode("todas")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === "todas"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Todas las Actividades
          </button>
        </div>

        {/* Filters */}
        <LogsActivityFilters onFilter={handleFilter} onReset={handleReset} />

        {/* Logs Table */}
        <LogsActivityTable logs={logs} loading={loading} />
      </main>
    </div>
  )
}