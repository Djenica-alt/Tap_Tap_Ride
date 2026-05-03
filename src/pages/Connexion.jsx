import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "./inscription.css";

export default function Connexion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulation de connexion
    setTimeout(() => {
      setIsLoading(false);
      alert("Connexion réussie ! Bienvenue sur TapTap Ride.");
      navigate("/reservation"); // <-- redirection vers Reservation
    }, 1000);
  };

  return (
    <main className="auth-page auth-login">
      <section className="auth-card">
        <div className="auth-card__header">
          <p className="auth-card__label">Se connecter</p>
          <h1>Bienvenue sur TapTap Ride</h1>
          <p className="auth-card__subtitle">
            Accédez à votre compte et réservez votre trajet en un clic.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="input-wrapper">
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="forgot-password">
            <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="auth-card__footer">
          <p>Pas encore de compte ?</p>
          <Link className="auth-link" to="/Inscription">
            S'inscrire
          </Link>
        </div>
      </section>
    </main>
  );
}