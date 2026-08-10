import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyToken() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  
  const hasCalled = useRef(false);

  useEffect(() => {
    if (!token || hasCalled.current) return;
    hasCalled.current = true; 

    const verify = async () => {
      try {
        await axios.get(`http://localhost:8000/api/verify-link?token=${token}`);
        alert("Success! Your account is verified.");
        navigate("/login");
      } catch (err) {
        alert("Verification failed. Link may be expired.");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Verifying your account... please wait.</p>
    </div>
  );
}