"use client"
import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';



export default function SignupPage() {
    const ref = useRef();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [issubmitted,setissubmitted]=useState(false);
    const [message, setMessage] = useState("");
    const [message1, setMessage1] = useState("");
    const [show, setshow] = useState(false)


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleshow = () => {
        setshow(!show)
        if (show === true) {
            ref.current.src = "/eye-crossed.svg"
        }
        else {
            ref.current.src = "/eye.svg"
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");
        

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const res1 = await fetch(`/api/user/${formData.email}`);
            const data2 = await res.json();
            const data1 = await res1.json();
            
            if(data1.success){
                setMessage1("Email already exists");
                setIsSubmitting(false);
            }
           

            if(res.status===201){
                setissubmitted(true);
                setFormData({ name: "", email: "", password: "" });
                toast.success(' sign up successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

            }
            console.log(data1);
            



        } catch (error) {
            console.error("Signup Error:", error);
            setMessage("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-300 to-white">
            <div className="bg-white text-black rounded-lg p-8 shadow-xl w-full max-w-md border">
                <h1 className="text-4xl font-bold mb-6 text-center">Sign Up for Luxury</h1>
                <form onSubmit={handleSubmit} className="space-y-7">
                    <div>
                        <label className="block text-sm font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full mt-2 p-3 border  rounded focus:outline-none focus:ring-2 focus:ring-[#b8860b] text-[#b8860b]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full mt-2 p-3 border  rounded focus:outline-none focus:ring-2 focus:ring-[#b8860b] text-[#b8860b]"
                        />
                    </div>
                    <div className="relative">
                        <label className=" block text-sm font-semibold">Password</label>
                        <input
                            type={show ? "text" : "password"}
                            name="password"
                            placeholder="Your Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#b8860b] text-[#b8860b]"
                        />
                        <div className="eyes">
                            <button type="button" onClick={handleshow} className="absolute right-2 bottom-4"><img ref={ref} src="/eye-crossed.svg" alt="" width={20} height={20} /></button>
                        </div>
                    </div>
                    <div className="emailerror">
                        { !issubmitted &&
                        <p className="text-red-500 text-sm">{message1}</p>
}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full hover:bg-[#b8860b] bg-gold text-white font-bold py-3 px-4 rounded-md transition"
                    >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                {message && <p className="mt-6 text-center text-sm">{message}</p>}
            </div>
            <ToastContainer />
        </div>
    );
}
