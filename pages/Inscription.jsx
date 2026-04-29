import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "./inscription.css";

export default function Inscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Le nom complet est requis";
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = "Le nom doit contenir au moins 2 caractères";
    }
    
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!/^[\d\s\-+()]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer le mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    if (!acceptTerms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulation d'inscription
    setTimeout(() => {
      setIsLoading(false);
      alert("Inscription réussie ! Bienvenue sur TapTap Ride.");
      navigate("/connexion");
    }, 1500);
  };

  return (
    <main className="auth-page auth-register">
      <section className="auth-card">
        <div className="auth-card__header">
          <p className="auth-card__label">Créer un compte</p>
          <h1>Rejoignez TapTap Ride</h1>
          <p className="auth-card__subtitle">
            Inscrivez-vous pour localiser, réserver et gérer vos trajets.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <Input
              label="Nom complet"
              type="text"
              name="fullname"
              placeholder="Votre nom complet"
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <span className="error-message">{errors.fullname}</span>}
          </div>
          
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
              label="Téléphone"
              type="tel"
              name="phone"
              placeholder="Votre numéro de téléphone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
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
          
          <div className="input-wrapper">
            <Input
              label="Confirmer le mot de passe"
              type="password"
              name="confirmPassword"
              placeholder="Confirmez le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <div className="terms-checkbox">
            <label>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span>
                J'accepte les{" "}
                <Link to="/conditions-utilisation">conditions d'utilisation</Link>
                {" "}et la{" "}
                <Link to="/politique-confidentialité">politique de confidentialité</Link>
              </span>
            </label>
            {errors.terms && <span className="error-message">{errors.terms}</span>}
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Inscription en cours..." : "Créer mon compte"}
          </Button>
        </form>

        <div className="auth-card__footer">
          <p>Déjà un compte ?</p>
          <Link className="auth-link" to="/connexion">
            Se connecter
          </Link>
        </div>
      </section>
    </main>
  );
}