import { useEffect, useState } from "react";
import "./App.css";
import "./css/bootstrap.min.css";
import "./css/bootstrap.css";
import "./css/vendors.css";
import "./css/style_wedding.css";
import logo from "./img/logo-wakeup.svg";
import axios from "axios";
import { toast, Toaster } from "sonner";
import img from "./img/main_img_1.jpg"
function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
  });


  const [weddingDate, setWeddingDate] = useState(new Date("2024-10-24T19:30:00")); 
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
    console.log(formData);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [step, setStep] = useState(1);
  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    const phonePattern = /^\d{8}$/; // Example pattern for a 8-digit phone number, adjust as per your needs

    const { email, telephone, firstName, lastName } = formData;

    // Email validation
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      telephone === ""
    ) {
      toast.error("Veuillez remplir tous les champs");
      return; // Exit if any field is empty
    }

    if (!emailPattern.test(email)) {
      toast.error("Format de l'email invalide");
      return; // Exit if email is invalid
    }

    // Telephone validation
    if (!phonePattern.test(telephone)) {
      toast.error(
        "Numéro de téléphone invalide. Il doit comporter 8 chiffres."
      );
      return; // Exit if telephone is invalid
    }

    try {
      console.log(formData);
      
      const response = await axios.post(
        "http://localhost:3000/api/user/createUser",
        formData
      );
      console.log(response);
      setStep(2);
    } catch (error) {
      setStep(1);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = weddingDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      // If the countdown is finished, stop the timer
      if (distance < 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateCountdown, 1000);

    // Initial call to set the countdown immediately
    updateCountdown();

    // Clear the interval on component unmount
    return () => clearInterval(timer);
  }, [weddingDate]);

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
                <img src={logo} alt="" width="100" height="100" />
              </a>
              <div className="social">
                <ul>
                  <li>
                    <a href="https://www.facebook.com/wakeupcosmeticstn">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="bi bi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/wakeup_cosmetics_milano/?igsh=MTluNnM1MmJ2YjRwcA%3D%3D">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h1>
                  <small>Nous sommes ravis de vous inviter à</small>
                  <br />
                  L'événement <em>Wake Up</em>
                </h1>

                <div className="countdown">
                  <h4>{`${weddingDate.toLocaleDateString()} à ${weddingDate.toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}`}</h4>
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
                <i className="bi bi-arrow-down-short"></i>
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
                                placeholder="Prénom"
                                value={formData.firstName}
                                onChange={handleChange}
                              />
                              <label htmlFor="firstName">Prénom</label>
                            </div>
                            <div className="mb-3 form-floating">
                              <input
                                type="text"
                                name="lastName"
                                id="lastname"
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
                            Soumettre
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="submit step">
                        <div className="summary">
                          <div className="wrapper">
                            <h3>
                              Nous sommes ravis de vous voir à l'événement Wake
                              Up !
                            </h3>
                            <p>
                              Merci pour votre participation. Nous vous
                              enverrons un email de confirmation à votre adresse
                              électronique très prochainement.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="container pb-4 copy">
              <span className="float-start">© Leaders Digital</span>
              <div className="social mobile">
                <ul>
                  <li>
                    <a href="#0">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="bi bi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
