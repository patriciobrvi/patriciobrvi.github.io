import React, { useState, useRef } from 'react';
import { Copy, FileText, ShieldAlert, CheckCircle, User, Activity, Lock, Server, AlertTriangle } from 'lucide-react';

// Opciones predefinidas para los desplegables
const incidentTypes = [
  "Ransomware / Secuestro de Datos",
  "Phishing / Ingeniería Social",
  "Acceso no autorizado (Intrusión)",
  "Fuga de Información (Data Leak)",
  "Denegación de Servicio (DDoS)",
  "Infección por Malware/Virus",
  "Compromiso de Correo Electrónico (BEC)",
  "Amenaza Interna (Insider Threat)",
  "Vulnerabilidad Explotada (0-day/Patching)"
];

const impactLevels = [
  "Bajo (Afectación mínima, sin pérdida de datos)",
  "Medio (Interrupción parcial, recuperación rápida)",
  "Alto (Interrupción crítica, impacto financiero/reputacional)",
  "Crítico (Paralización de operaciones, fuga masiva)"
];

const departments = [
  "Finanzas / Contabilidad",
  "Recursos Humanos",
  "Operaciones / Logística",
  "Ventas / Marketing",
  "Tecnología (TI) / Desarrollo",
  "Legal / Compliance",
  "Dirección General",
  "Toda la Organización"
];

const affectedSystems = [
  "Servidores de Archivos / Bases de Datos",
  "Cuentas de Correo Corporativo",
  "Sistema ERP / CRM",
  "Página Web Corporativa / E-commerce",
  "Estaciones de Trabajo (Endpoints)",
  "Red Interna / VPN",
  "Dispositivos Móviles"
];

const rootCauses = [
  "apertura de un archivo/enlace malicioso (Phishing)",
  "uso de credenciales débiles o comprometidas",
  "falta de actualización de parches de seguridad",
  "configuración incorrecta de un sistema expuesto",
  "error humano en el manejo de información",
  "ejecución de software no autorizado",
  "explotación de una vulnerabilidad desconocida"
];

const attackersGoal = [
  "la extorsión económica (Ransomware)",
  "el robo de propiedad intelectual o datos sensibles",
  "la interrupción operativa del servicio",
  "el fraude financiero",
  "el daño reputacional a la marca",
  "el uso de nuestra infraestructura para otros ataques"
];

const containmentActions = [
  "el aislamiento inmediato de los equipos afectados",
  "el bloqueo de cuentas de usuario y cambio de contraseñas",
  "la desconexión temporal de los servicios expuestos",
  "el bloqueo de direcciones IP y dominios maliciosos en el firewall",
  "la aplicación de parches de emergencia"
];

const recommendationsList = [
  "implementar/reforzar el doble factor de autenticación (MFA)",
  "realizar campañas de concienciación y simulacros de phishing",
  "fortalecer la política de contraseñas y rotación de credenciales",
  "revisar y endurecer las reglas de firewall y acceso remoto",
  "acelerar el ciclo de parches en sistemas críticos",
  "desplegar soluciones EDR/XDR en todos los terminales",
  "realizar una auditoría de permisos y accesos (Mínimo Privilegio)"
];

export default function App() {
  // Estado del formulario
  const [formData, setFormData] = useState({
    managerName: "",
    analystName: "",
    incidentDate: new Date().toISOString().substr(0, 10),
    incidentTime: "09:00",
    incidentType: incidentTypes[0],
    impactLevel: impactLevels[1],
    department: departments[4],
    system: affectedSystems[0],
    rootCause: rootCauses[0],
    attackerGoal: attackersGoal[0],
    containmentAction: containmentActions[0],
    recommendation1: recommendationsList[0],
    recommendation2: recommendationsList[1]
  });

  const [generatedReport, setGeneratedReport] = useState("");
  const reportRef = useRef(null);

  // Manejador de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Lógica de generación del informe
  const generateReport = () => {
    // Limpiamos el nivel de impacto para el texto (quitamos la descripción entre paréntesis)
    const cleanImpact = formData.impactLevel.split(" (")[0];
    
    const report = `Asunto: Informe Ejecutivo de Cierre de Incidente - ${formData.incidentType} - ${formData.incidentDate}

Estimado/a ${formData.managerName || "[Nombre del Gerente]"},

El presente informe tiene como objetivo notificar el cierre y resolución del incidente de seguridad detectado en nuestros sistemas el pasado ${formData.incidentDate} a las ${formData.incidentTime}. El evento afectó principalmente al área de ${formData.department}, comprometiendo temporalmente ${formData.system}, lo que generó un impacto clasificado como ${cleanImpact} para la operatividad del negocio durante la contingencia.

La investigación forense preliminar ha determinado que el incidente se originó debido a ${formData.rootCause}. Esta vulnerabilidad permitió que un actor no autorizado comprometiera la seguridad interna, cuyo objetivo aparente era ${formData.attackerGoal}.

Ante esta situación, el equipo de Respuesta a Incidentes activó los protocolos de seguridad de manera inmediata. Las fases críticas de contención y erradicación se ejecutaron exitosamente mediante ${formData.containmentAction}, logrando detener la amenaza y prevenir su propagación lateral. Posteriormente, se procedió a la recuperación y validación de los sistemas, los cuales operan con normalidad a la fecha de este informe.

Con el fin de evitar la recurrencia de este escenario y fortalecer nuestra postura de ciberseguridad, recomendamos priorizar dos acciones a corto plazo: ${formData.recommendation1} y ${formData.recommendation2}.

Quedo a su entera disposición para ampliar cualquier detalle técnico o administrativo sobre las acciones tomadas.

Cordialmente,

${formData.analystName || "[Tu Nombre]"}
Líder de Respuesta a Incidentes de Seguridad`;

    setGeneratedReport(report);
  };

  // Copiar al portapapeles
  const copyToClipboard = () => {
    if (reportRef.current) {
      reportRef.current.select();
      document.execCommand('copy');
      alert("Informe copiado al portapapeles");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-red-400" />
              Generador de Informes de Incidentes
            </h1>
            <p className="text-slate-300 text-sm mt-1">Herramienta para comunicación ejecutiva post-incidente (Formato NIST/ISO)</p>
          </div>
          <div className="hidden md:block">
            <span className="bg-red-500 text-xs font-bold px-2 py-1 rounded text-white uppercase tracking-wide">Confidencial</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          
          {/* Columna Izquierda: Formulario */}
          <div className="p-6 space-y-6 border-r border-gray-200 bg-gray-50">
            
            {/* Sección: Datos Personales y Tiempo */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-slate-700 uppercase mb-3 flex items-center gap-2">
                <User className="w-4 h-4" /> Datos Generales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Nombre del Gerente</label>
                  <input type="text" name="managerName" placeholder="Ej. Laura García" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tu Nombre (Analista)</label>
                  <input type="text" name="analystName" placeholder="Ej. Carlos Ruiz" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Fecha Detección</label>
                  <input type="date" name="incidentDate" value={formData.incidentDate} className="w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Hora Detección</label>
                  <input type="time" name="incidentTime" value={formData.incidentTime} className="w-full p-2 border rounded" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Sección: Clasificación del Incidente */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-slate-700 uppercase mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Clasificación e Impacto
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tipo de Incidente</label>
                  <select name="incidentType" className="w-full p-2 border rounded bg-white" onChange={handleChange}>
                    {incidentTypes.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Nivel de Impacto</label>
                    <select name="impactLevel" className="w-full p-2 border rounded bg-white" onChange={handleChange}>
                      {impactLevels.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Departamento Afectado</label>
                    <select name="department" className="w-full p-2 border rounded bg-white" onChange={handleChange}>
                      {departments.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Sistema o Activo Comprometido</label>
                  <select name="system" className="w-full p-2 border rounded bg-white" onChange={handleChange}>
                    {affectedSystems.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Sección: Análisis Técnico */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-slate-700 uppercase mb-3 flex items-center gap-2">
                <Server className="w-4 h-4" /> Análisis y Respuesta
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Causa Raíz (El incidente se originó debido a...)</label>
                  <select name="rootCause" className="w-full p-2 border rounded bg-white" onChange={handleChange}>
                    {rootCauses.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Objetivo del Atacante (El motivo era...)</label>
                  <select name="attackerGoal" className="w-full p-2 border rounded bg-white" onChange={handleChange}>
                    {attackersGoal.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Acción Principal de Contención</label>
                  <select name="containmentAction" className="w-full p-2 border rounded bg-white" onChange={handleChange}>
                    {containmentActions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Sección: Recomendaciones */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-slate-700 uppercase mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Recomendaciones de Mejora
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Recomendación 1</label>
                  <select name="recommendation1" className="w-full p-2 border rounded bg-white" onChange={handleChange}>
                    {recommendationsList.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Recomendación 2</label>
                  <select name="recommendation2" className="w-full p-2 border rounded bg-white" onChange={handleChange} defaultValue={recommendationsList[1]}>
                    {recommendationsList.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={generateReport}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <FileText className="w-5 h-5" /> Generar Informe Ejecutivo
            </button>

          </div>

          {/* Columna Derecha: Resultado */}
          <div className="p-6 bg-slate-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Vista Previa del Informe
              </h2>
              <button 
                onClick={copyToClipboard}
                className="text-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-1 px-3 rounded flex items-center gap-2 transition"
                disabled={!generatedReport}
              >
                <Copy className="w-4 h-4" /> Copiar
              </button>
            </div>

            <div className="flex-grow relative">
              <textarea
                ref={reportRef}
                className="w-full h-full min-h-[500px] p-6 bg-white border border-gray-300 rounded-lg shadow-inner resize-none focus:outline-none text-gray-700 leading-relaxed font-serif"
                value={generatedReport}
                readOnly
                placeholder="El informe generado aparecerá aquí. Complete el formulario de la izquierda y presione 'Generar Informe'."
              ></textarea>
              
              {!generatedReport && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <ShieldAlert className="w-32 h-32 text-gray-400" />
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Nota de estilo:</strong> Este informe utiliza un formato narrativo (prosa) diseñado para gerencia. Evita listas técnicas extensas y se enfoca en el impacto al negocio y la resolución exitosa del incidente, manteniendo una longitud inferior a 300 palabras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}