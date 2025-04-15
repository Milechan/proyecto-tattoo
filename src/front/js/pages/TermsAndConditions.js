import React from 'react';
import '../../styles/termsandconditions.css';

const TermsAndConditions = () => {
    return (
        <div className="terms-page-container">
            <h1 style={{ color: "#f5f4f2" }}>Términos y Condiciones</h1>

            <div className="terms-content">
                <section className="terms-section">
                    <h3>1. Introducción</h3>
                    <p>
                        Bienvenido a MatchTattoo. Al acceder a nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo, te recomendamos que no uses este sitio.
                    </p>
                </section>

                <section className="terms-section">
                    <h3>2. Definiciones</h3>
                    <ul>
                        <li><strong>Usuarios:</strong> Cualquier persona que acceda o use este sitio web.</li>
                        <li><strong>Contenido:</strong> Todo el material que aparece en el sitio web, incluyendo texto, imágenes y gráficos.</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h3>3. Uso del Sitio Web</h3>
                    <p>
                        Al usar nuestro sitio, te comprometes a no realizar actividades ilegales o no autorizadas, como la distribución de malware o la suplantación de identidad.
                    </p>
                </section>

                <section className="terms-section">
                    <h3>4. Propiedad Intelectual</h3>
                    <p>
                        Todo el contenido de este sitio web, incluidos los textos, gráficos, logotipos y demás materiales, es propiedad de los tatuadores dueños de cada perfil y está protegido por las leyes de propiedad intelectual.
                    </p>
                </section>

                <section className="terms-section">
                    <h3>5. Política de Privacidad</h3>
                    <p>
                        Recopilamos información personal únicamente cuando es necesaria para proporcionarte un mejor servicio. Tu información será utilizada de acuerdo con nuestra política de privacidad.
                    </p>
                </section>

                <section className="terms-section">
                    <h3>6. Modificación de los Términos</h3>
                    <p>
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones se publicarán en esta página con una fecha de revisión.
                    </p>
                </section>

                <section className="terms-section">
                    <h3>7. Responsabilidad</h3>
                    <p>
                        No nos hacemos responsables de los daños o pérdidas resultantes del uso de este sitio web.
                    </p>
                </section>

                <section className="terms-section">
                    <h3>8. Ley Aplicable y Jurisdicción</h3>
                    <p>
                        Estos términos se regirán por las leyes de [país o región]. En caso de disputa, los tribunales de [ubicación] serán los competentes.
                    </p>
                </section>

                <section className="terms-section">
                    <h3>9. Contacto</h3>
                    <p>
                        Si tienes alguna pregunta o comentario sobre estos términos, puedes contactarnos en soporte@matchtatto.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsAndConditions;