import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

const Contacts = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const { register, handleSubmit, errors } = useForm();

    const serviceID = "service_ID";
    const templateID = "template_ID";
    const userID = "1RALWROlrn29yTsLV";

    const onSubmit = (data, r) => {
        sendEmail(
            serviceID,
            templateID,
            {
                name: data.name,
                phone: data.phone,
                email: data.email,
                subject: data.subject,
                description: data.description
            },
            userID
        )
        r.target.reset();
    }

    const sendEmail = (serviceID, templateID, variables, userID) => {
        emailjs.send(serviceID, templateID, variables, userID)
            .then(() => {
                setSuccessMessage("Form sent successfully! I'll contact you as soon as possible.");
            }).catch(err => console.error(`Something went wrong ${err}`));
    }

  return (
    <div id="Contacts" className="contacts bg-dark">
      <div className="text-center">
        <h1>Contactez-nous</h1>
        <p>Veuillez remplir le formulaire et décrire vos besoins en matière de projet. Je communiquerai avec vous dès que possible.</p>
          <span className="success-message">{successMessage}</span>
      </div>
      <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
              <div className="col-md-6 col-xs-12">
                  <div className="text-center">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      {...register("name",{
                              name :"name",
                              required: "Please enter your name",
                              maxLength: {
                                  value: 20,
                                  message: "Please enter a name with fewer than 20 characters"
                              }
                          })
                      }
                  />
                  <div className="line"/>
                  </div>
                  <div className="text-center">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phone"
                      {...register("phone",{
                          required: "Please add your phone number",
                      })
                      }
                  />
                  <div className="line"/>
                  </div>
                  <div className="text-center">
                  <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      {...register("Email",{
                          required: "Please provide you email",
                          pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "invalid Email"
                          }
                      })
                      }
                  />
                  <div className="line"/>
                  </div>
                  <div className="text-center">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      name="subject"
                      {...register("Subject",{
                          required: "OOPS, you forget to add the subject.",
                      })
                      }
                  />
                  <div className="line"/>
                  </div>
              </div>
                  <div className="col-md-6 col-xs-12">
                      <div className="text-center">
                  <textarea
                      type="text"
                      className="form-control"
                      placeholder="Veuillez décrire brièvement votre projet..."
                      name="description"
                      {...register("description",{
                          required: "Please describe shortly your project needs...",
                      })
                      }
                  />
                          <div className="line_text"/>
                      </div>

                      <button className="btn-main-offer contact-btn" type="submit">Contactez-nous</button>
                  </div>
              </div>
          </form>
      </div>
    </div>
  )
}

export default Contacts;
