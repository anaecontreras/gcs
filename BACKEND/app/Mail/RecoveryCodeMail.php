<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecoveryCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    // Propiedades públicas: necesarias para que la vista del correo pueda acceder a ellas directamente
    public $code;
    public $userName;

    /**
     * Prepara los datos que viajarán en el correo.
     * Recibimos el código y el nombre para personalizar el mensaje y que el usuario sepa que es para él.
     */
    public function __construct($code, $userName)
    {
        $this->code = $code;
        $this->userName = $userName;
    }

    /**
     * Configura el correo: asunto, vista y variables disponibles.
     * Todo centralizado aquí para que sea fácil ajustar el formato sin tocar la lógica de envío.
     */
    public function build()
    {
        return $this->subject('Código de Recuperación de Contraseña - Sistema Satelital')
                    ->view('emails.recovery-code')
                    ->with([
                        'code' => $this->code,
                        'userName' => $this->userName,
                    ]);
    }
}