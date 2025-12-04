import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/user/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setStatus("Email verified successfully! You can now log in.");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setStatus("Verification failed. Please try again.");
        }
      } catch (error) {
        const msg = error.response?.data?.message || "Verification failed";
        setStatus(msg);
      }
    };

    verify();
  }, [token, navigate]);


  return (
    <div className="relative w-full h-[760px] bg-pink-100 overflow-hidden">
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-6 text-pink-600">Email Verification</h2>
                <p className="mb-4">{status}</p>
            </div>
        </div>
    </div>
  )
}

export default VerifyEmail