import { useEffect, useState } from "react";
import "./App.css";
import "./css/bootstrap.min.css";
import "./css/bootstrap.css";
import "./css/vendors.css";
import "./css/style_wedding.css";
import logo from "./img/logo-wakeup.svg";
import axios from "axios";
import { toast, Toaster } from "sonner";
import img from "./img/finalback.png";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    profession: "",
    activite: "",
  });

  const [weddingDate, setWeddingDate] = useState(
    new Date("2024-10-24T19:30:00")
  );
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = weddingDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    return () => clearInterval(timer); // Cleanup on unmount
  }, [weddingDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [step, setStep] = useState(1);

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
        "http://localhost:3000/api/user/createUser",
        formData
      );
      console.log(response);
      setStep(2);
    } catch (error) {
      setStep(1);
      toast.error(
        error.response?.data?.message || "Erreur lors de l'inscription."
      );
    }
  };

  return (
    <>
      <Toaster richColors />
      <div id="loader_form">
        <div data-loader="circle-side-2"></div>
      </div>

      <div className="container-fluid">
        <div className="row row-height">
          <div
            className="col-lg-6 background-image p-0"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div
              className="content-left-wrapper opacity-mask d-flex align-items-center text-center justify-content-center"
              style={{ background: "rgba(0, 0, 0, 0.05)" }}
            >
              <a href="#0" id="logo">
                <img src={logo} alt="Logo" width="100" height="100" />
              </a>
              <div className="social">
                <ul>
                  <li>
                    <a href="https://www.facebook.com/wakeupcosmeticstn">
                      <i
                        className="bi bi-facebook"
                        style={{ color: "#d47e00" }}
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i
                        className="bi bi-twitter"
                        style={{ color: "#d47e00" }}
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/wakeup_cosmetics_milano/?igsh=MTluNnM1MmJ2YjRwcA%3D%3D">
                      <i
                        className="bi bi-instagram"
                        style={{ color: "#d47e00" }}
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div style={{ color: "white" }}>
                <h1>
                  <small style={{ color: "white" }}>
                    Nous sommes ravis de vous inviter à
                  </small>
                  <br />
                  L'événement <em style={{ fontSize: "80px" }}>Wake Up</em>
                </h1>

                <div className="countdown">
                  <h4 style={{ color: "white" }}>
                    {`${weddingDate.toLocaleDateString()} à ${weddingDate.toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}`}
                  </h4>
                  <div className="container_count">
                    <div id="days">
                      {countdown.days.toString().padStart(2, "0")}
                    </div>{" "}
                    jours
                  </div>
                  <div className="container_count">
                    <div id="hours">
                      {countdown.hours.toString().padStart(2, "0")}
                    </div>{" "}
                    heures
                  </div>
                  <div className="container_count">
                    <div id="minutes">
                      {countdown.minutes.toString().padStart(2, "0")}
                    </div>{" "}
                    minutes
                  </div>
                  <div className="container_count last">
                    <div id="seconds">
                      {countdown.seconds.toString().padStart(2, "0")}
                    </div>{" "}
                    secondes
                  </div>
                </div>
              </div>
              <a
                className="smoothscroll btn_scroll_to Bounce infinite"
                href="#wizard_container"
              >
                <i
                  className="bi bi-arrow-down-short"
                  style={{ color: "#d47e00" }}
                ></i>
              </a>
            </div>
          </div>

          <div className="col-lg-6 d-flex flex-column content-right">
            <div className="container my-auto py-5">
              <div className="row">
                <div className="col-lg-9 col-xl-7 mx-auto">
                  <div id="wizard_container">
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
                      <div id="wrapped">
                        <h3 className="main_question">
                          Merci pour votre inscription !
                        </h3>
                        <p>Nous avons bien reçu vos informations.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="footer_striped text-center">
              © 2024 WakeUp Event
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
