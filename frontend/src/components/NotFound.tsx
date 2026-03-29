import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button"; // Using your existing Button component

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative">
      {/* 1. This section is now static */}
      <div className="relative"> 
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
      </div>
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }} // Slightly faster transition
      >
        <p className="text-2xl md:text-3xl text-white font-medium mb-4">
          Oops! This path is missing.
        </p>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          The team you're looking for might have been deleted, or the URL simply doesn't exist.
        </p>
        
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl transition-all">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}