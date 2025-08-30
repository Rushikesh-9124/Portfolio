import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import axiosInstance from "@/healper/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axiosInstance.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/edit");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center  relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-10 w-56 h-56 rounded-full bg-gradient-to-r from-lime-600 to-green-500 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-gradient-to-r from-cyan-600 to-blue-500 blur-3xl"
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-[350px] backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white text-3xl font-bold text-center"
        >
          Welcome Back Admin
        </motion.h3>

        <div className="flex flex-col gap-6">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-400 focus:border-lime-400 outline-none px-2 py-2 transition"
              placeholder="Email"
              type="email"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-400 focus:border-lime-400 outline-none px-2 py-2 transition"
              placeholder="Password"
              type="password"
            />
          </motion.div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-400 text-sm"
          >
            {error}
          </motion.p>
        )}

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4"
        >
          <Button
            onClick={loginHandler}
            className="w-full bg-gradient-to-r from-lime-600 to-green-500 text-white font-semibold py-2 rounded-xl hover:from-green-500 hover:to-lime-600 transition-all shadow-lg shadow-lime-900/40"
          >
            Login
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
