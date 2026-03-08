import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

const SignupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/explore", { replace: true });
  }, [user, navigate]);

  const handleEmailAuth = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/explore");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/explore",
      });
      if (result.error) throw result.error;
    } catch (error: any) {
      toast.error(error.message || "Google sign-in failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm mx-auto"
      >
        <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground mb-8">
          ← Back
        </button>

        <h1 className="font-display text-3xl font-bold mb-2">
          {isLogin ? "Welcome Back" : "Join VillageConnect"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isLogin ? "Sign in to continue your journey" : "Create your account to book verified rural experiences"}
        </p>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-border hover:border-muted-foreground/30 transition-all mb-4 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Email/Password */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-border focus-within:border-primary transition-colors">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-foreground focus:outline-none placeholder:text-muted-foreground"
            />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 characters)"
            className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <button
          onClick={handleEmailAuth}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>

        <div className="flex items-center gap-2 mt-6 p-3 rounded-xl bg-trust/5 border border-trust/15">
          <ShieldCheck className="w-4 h-4 text-trust flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Optional ID verification available for <span className="font-semibold text-trust">Trust Badge</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
