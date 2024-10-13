import React from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4 text-center">Terms and Conditions</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p className="text-gray-700">
                    By using our platform, you agree to be bound by these Terms and Conditions. If you do not agree with
                    any part of the terms, please refrain from using our services.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
                <p className="text-gray-700">
                    You are responsible for maintaining the confidentiality of your account and password. You agree not to
                    misuse our services for illegal activities or violate the rights of others.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Limitation of Liability</h2>
                <p className="text-gray-700">
                    We are not liable for any damages resulting from the use of our platform. Use the services at your own risk.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Changes to Terms</h2>
                <p className="text-gray-700">
                    We reserve the right to modify these Terms and Conditions at any time. Continued use of the service constitutes acceptance of the updated terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Contact Us</h2>
                <p className="text-gray-700">
                    If you have any questions about these Terms, please contact us at <a href="mailto:support@connectverse.com" className="text-blue-600 hover:underline">support@connectverse.com</a>.
                </p>
            </section>
        </div>
    );
}

export default Terms;