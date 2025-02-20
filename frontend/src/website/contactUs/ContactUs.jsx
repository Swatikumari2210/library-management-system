import { useState } from "react";
import { contactUs } from "../../http";
import "./contactUs.scss";
import { useSelector } from "react-redux";
import {toast} from "react-hot-toast";

const ContactUs = () => {
  const auth= useSelector((state)=>state.auth);
  const [formData,setFormData] = useState({
      name :  auth?.user?.name || "",
      email : auth?.user?.email || "",
      message : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = contactUs({
      name: formData.name,
      email: formData.email,
      message : formData.message
    });

    toast.promise(promise, {
      loading: "Sending...",
      success: (data) => {
        setFormData({...formData,message:""});
        return "Message sent successfully..";
      },
      error: (err) => {
        console.log(err);
        return err?.response?.data?.message || "Something went wrong !";
      },
    });
  }
  return (
    <div className="bg text__color contactus">
        <div className="heading">
        <h1>Contact Us</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter name" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-control">
                <label htmlFor="message">Message</label>
                <textarea name="message"  id="message" cols="30" rows="6" placeholder="Enter message" className="bg__accent text__color" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button className="btn btn__primary" type="submit">SUBMIT</button>
        </form>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.942006284409!2d77.11393427445218!3d28.63150017566532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0351baff6933%3A0x48a94e3504dadb9e!2sGuru%20Tegh%20Bahadur%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1740074979397!5m2!1sen!2sin" 
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
        </iframe>

    </div>
  )
}

export default ContactUs