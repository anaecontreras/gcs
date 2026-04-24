<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Recuperación</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background-color: #1a56db;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .code {
            font-size: 32px;
            font-weight: bold;
            color: #1a56db;
            background-color: #f0f4ff;
            padding: 15px;
            border-radius: 8px;
            letter-spacing: 5px;
            margin: 20px 0;
            font-family: monospace;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .warning {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 20px;
        }
        button {
            background-color: #1a56db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Sistema de Gestión de Contingencias Satelitales</h2>
        </div>
        
        <div class="content">
            <h3>Hola {{ $userName }},</h3>
            
            <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
            
            <p>Tu código de verificación es:</p>
            
            <div class="code">
                {{ $code }}
            </div>
            
            <p>Este código es válido por <strong>60 minutos</strong>.</p>
            
            <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
            
            <div class="warning">
                <strong>⚠️  Por seguridad:</strong> No compartas este código con nadie.  ⚠️
            </div>
        </div>
        
        <div class="footer">
            <p>Sistema de Gestión de Contingencias Satelitales - CANTV</p>
            <p>Este es un correo automático, por favor no responder.</p>
        </div>
    </div>
</body>
</html>