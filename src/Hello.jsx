import axios from 'axios';
import React, { useState } from 'react'
import { toast, Toaster } from 'sonner';

const Hello = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    profession: "",
    activite: "",
  });
  const [step, setStep] = useState(2);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{8}$/;

    const { email, telephone, firstName, profession, activite } = formData;

    if (!firstName || !email || !telephone || !profession || !activite) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (!emailPattern.test(email)) {
      toast.error("Format de l'email invalide.");
      return;
    }

    if (!phonePattern.test(telephone)) {
      toast.error(
        "Numéro de téléphone invalide. Il doit comporter 8 chiffres."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/createUser`,
        formData
      );
      console.log(response);
      setStep(2);
    } catch (error) {

      toast.error(
        error.response?.data?.message || "Erreur lors de l'inscription."
      );
    }
  };
  return (
    <div id="wizard_container" style={{ padding: "50px" }}>
      <Toaster />
      <div id="top-wizard">
        <span id="location"></span>
        <div id="progressbar"></div>
      </div>

      {step === 1 && (
        <div id="wrapped">
          <input
            id="website"
            name="website"
            type="text"
            value=""
            hidden
          />
          <div id="middle-wizard">
            <div className="step">
              <h3 className="main_question">
                Veuillez remplir vos informations
              </h3>

              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control required"
                  placeholder="Nom"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="firstName">Prénom</label>
              </div>

              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control required"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">Nom</label>
              </div>

              <div className="mb-3 form-floating">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control required"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Votre email</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="text"
                  name="telephone"
                  id="telephone"
                  className="form-control"
                  placeholder="Votre téléphone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
                <label htmlFor="telephone">Votre téléphone</label>
              </div>

              {/* Dropdowns Section */}
              <div className="row">
                <div className="col-6 mb-3">
                  <div className="form-floating">
                    <select
                      name="profession"
                      id="profession"
                      className="form-control"
                      value={formData.profession}
                      onChange={handleChange}
                    >
                      <option value="">
                        Sélectionnez Profession
                      </option>
                      <option value="Propriétaire">
                        Propriétaire
                      </option>
                      <option value="Cadre">Cadre</option>
                      <option value="Gérant">Gérant</option>
                      <option value="Commercial">
                        Commercial
                      </option>
                      <option value="Maquilleur">
                        Maquilleur
                      </option>
                      <option value="Invités VIP">
                        Invités VIP
                      </option>
                    </select>
                    <label htmlFor="profession">Profession</label>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="form-floating">
                    <select
                      name="activite"
                      id="activite"
                      className="form-control"
                      value={formData.activite}
                      onChange={handleChange}
                    >
                      <option value="">
                        Sélectionnez Activité
                      </option>
                      <option value="Boutique">Boutique</option>
                      <option value="Pharmacie">Pharmacie</option>
                      <option value="Salon Esthétique">
                        Salon Esthétique
                      </option>
                      <option value="Parfumerie">Parfumerie</option>
                      <option value="Salon de Beauté">Salon de Beauté</option>
                      <option value="Grossiste Makeup">Grossiste Makeup</option>
                      <option value="Ecole de Formation">Ecole de Formation</option>
                      <option value="Para">Para</option>
                      <option value="Autres">Autres</option>
                    </select>
                    <label htmlFor="activite">Activité</label>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div id="bottom-wizard">
            <button
              type="submit"
              name="process"
              className="submit"
              onClick={() => {
                handleSubmit();
              }}
              style={{ background: "#d47e00" }}
            >
              Envoyez
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div id="wrapped" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <h3 className="main_question">
            Invité avec Succès !
          </h3>
          <div>
            <button
              type="button "
              name="process"
              className="submit"
              onClick={() => { setStep(1) }}
              style={{ background: "#d47e00" }}
            >
              Ajouter un autre invité
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hello