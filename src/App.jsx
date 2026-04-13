import React, { useState, useEffect, useRef } from 'react';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { 
  FileText, CheckCircle, Settings, Download, Plus, Trash2, 
  Search, Briefcase, GraduationCap, User, Target, ChevronRight, 
  AlertCircle, Loader2, Save, LogOut, Cpu, Network,
  UploadCloud, Zap, Link as LinkIcon, Award, Code, 
  RefreshCw, FileSearch, Check, Sparkles, AlertTriangle, Lock
} from 'lucide-react';

// Auto-switch: Localhost for development, Render URL for production (Vercel)
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8000/api/v1' 
  : 'https://resumekaro-backend.onrender.com/api/v1';

// Initialize Supabase Client 
const supabaseUrl = "https://xjsbbxqyrsdvgbbceuxe.supabase.co";
const supabaseKey = "sb_publishable_lefQ3KrnsmrLJv6qzwXNJg_RZX2fQEe";
const supabase = createClient(supabaseUrl, supabaseKey);

// --- 50 Simple, ATS-Friendly Templates Configuration ---
const TEMPLATES = [
  { id: 'sidebar-dark-blue', name: 'Modern Sidebar - Blue', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-slate-800', text: 'text-white', accent: 'bg-blue-500', accentText: 'text-blue-500' },
  { id: 'sidebar-dark-emerald', name: 'Modern Sidebar - Emerald', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-slate-900', text: 'text-white', accent: 'bg-emerald-500', accentText: 'text-emerald-500' },
  { id: 'sidebar-dark-rose', name: 'Modern Sidebar - Rose', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-zinc-900', text: 'text-white', accent: 'bg-rose-500', accentText: 'text-rose-500' },
  { id: 'sidebar-dark-indigo', name: 'Modern Sidebar - Indigo', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-slate-800', text: 'text-white', accent: 'bg-indigo-500', accentText: 'text-indigo-500' },
  { id: 'sidebar-dark-teal', name: 'Modern Sidebar - Teal', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-gray-900', text: 'text-white', accent: 'bg-teal-500', accentText: 'text-teal-500' },
  { id: 'sidebar-dark-amber', name: 'Modern Sidebar - Amber', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-stone-900', text: 'text-white', accent: 'bg-amber-500', accentText: 'text-amber-500' },
  { id: 'sidebar-dark-cyan', name: 'Modern Sidebar - Cyan', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-slate-900', text: 'text-white', accent: 'bg-cyan-500', accentText: 'text-cyan-500' },
  { id: 'sidebar-dark-violet', name: 'Modern Sidebar - Violet', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-zinc-800', text: 'text-white', accent: 'bg-violet-500', accentText: 'text-violet-500' },
  { id: 'sidebar-dark-gray', name: 'Modern Sidebar - Gray', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-gray-800', text: 'text-white', accent: 'bg-gray-400', accentText: 'text-gray-400' },
  { id: 'sidebar-dark-black', name: 'Modern Sidebar - High Contrast', layout: 'sidebar-left', font: 'font-sans', bg: 'bg-black', text: 'text-white', accent: 'bg-white', accentText: 'text-gray-300' },
  { id: 'sidebar-light-blue', name: 'Soft Sidebar - Blue', layout: 'sidebar-left-light', font: 'font-sans', bg: 'bg-blue-50', text: 'text-slate-800', accent: 'border-blue-300', accentText: 'text-blue-700' },
  { id: 'sidebar-light-gray', name: 'Soft Sidebar - Gray', layout: 'sidebar-left-light', font: 'font-sans', bg: 'bg-slate-100', text: 'text-slate-800', accent: 'border-slate-300', accentText: 'text-slate-700' },
  { id: 'sidebar-light-green', name: 'Soft Sidebar - Green', layout: 'sidebar-left-light', font: 'font-sans', bg: 'bg-green-50', text: 'text-slate-800', accent: 'border-green-300', accentText: 'text-green-700' },
  { id: 'sidebar-light-rose', name: 'Soft Sidebar - Rose', layout: 'sidebar-left-light', font: 'font-sans', bg: 'bg-rose-50', text: 'text-slate-800', accent: 'border-rose-300', accentText: 'text-rose-700' },
  { id: 'sidebar-light-indigo', name: 'Soft Sidebar - Indigo', layout: 'sidebar-left-light', font: 'font-sans', bg: 'bg-indigo-50', text: 'text-slate-800', accent: 'border-indigo-300', accentText: 'text-indigo-700' },
  { id: 'center-classic-black', name: 'Classic Professional - Black', layout: 'center', font: 'font-serif', bg: 'bg-white', text: 'text-slate-900', accent: 'border-slate-800', accentText: 'text-slate-800' },
  { id: 'center-classic-navy', name: 'Classic Professional - Navy', layout: 'center', font: 'font-serif', bg: 'bg-white', text: 'text-slate-900', accent: 'border-blue-900', accentText: 'text-blue-900' },
  { id: 'center-classic-burgundy', name: 'Classic Professional - Burgundy', layout: 'center', font: 'font-serif', bg: 'bg-white', text: 'text-slate-900', accent: 'border-rose-900', accentText: 'text-rose-900' },
  { id: 'center-classic-forest', name: 'Classic Professional - Forest', layout: 'center', font: 'font-serif', bg: 'bg-white', text: 'text-slate-900', accent: 'border-emerald-900', accentText: 'text-emerald-900' },
  { id: 'center-classic-slate', name: 'Classic Professional - Slate', layout: 'center', font: 'font-serif', bg: 'bg-white', text: 'text-slate-900', accent: 'border-slate-600', accentText: 'text-slate-700' },
  { id: 'center-modern-blue', name: 'Centered Modern - Blue', layout: 'center', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'border-blue-600', accentText: 'text-blue-600' },
  { id: 'center-modern-indigo', name: 'Centered Modern - Indigo', layout: 'center', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'border-indigo-600', accentText: 'text-indigo-600' },
  { id: 'center-modern-teal', name: 'Centered Modern - Teal', layout: 'center', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'border-teal-600', accentText: 'text-teal-600' },
  { id: 'center-modern-rose', name: 'Centered Modern - Rose', layout: 'center', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'border-rose-600', accentText: 'text-rose-600' },
  { id: 'center-modern-gray', name: 'Centered Modern - Gray', layout: 'center', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'border-gray-500', accentText: 'text-gray-600' },
  { id: 'center-bold-blue', name: 'Impact Header - Blue', layout: 'center-bold', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'bg-blue-600', accentText: 'text-blue-600' },
  { id: 'center-bold-emerald', name: 'Impact Header - Emerald', layout: 'center-bold', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'bg-emerald-600', accentText: 'text-emerald-600' },
  { id: 'center-bold-rose', name: 'Impact Header - Rose', layout: 'center-bold', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'bg-rose-600', accentText: 'text-rose-600' },
  { id: 'center-bold-indigo', name: 'Impact Header - Indigo', layout: 'center-bold', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'bg-indigo-600', accentText: 'text-indigo-600' },
  { id: 'center-bold-slate', name: 'Impact Header - Slate', layout: 'center-bold', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'bg-slate-800', accentText: 'text-slate-800' },
  { id: 'left-modern-indigo', name: 'Clean Left - Indigo', layout: 'left', font: 'font-sans', bg: 'bg-white', text: 'text-slate-800', accent: 'border-indigo-600', accentText: 'text-indigo-600' },
  { id: 'left-modern-teal', name: 'Clean Left - Teal', layout: 'left', font: 'font-sans', bg: 'bg-white', text: 'text-slate-800', accent: 'border-teal-600', accentText: 'text-teal-600' },
  { id: 'left-modern-slate', name: 'Clean Left - Minimalist', layout: 'left', font: 'font-sans', bg: 'bg-white', text: 'text-slate-800', accent: 'border-slate-300', accentText: 'text-slate-700' },
  { id: 'left-modern-blue', name: 'Clean Left - Blue', layout: 'left', font: 'font-sans', bg: 'bg-white', text: 'text-slate-800', accent: 'border-blue-600', accentText: 'text-blue-600' },
  { id: 'left-modern-emerald', name: 'Clean Left - Emerald', layout: 'left', font: 'font-sans', bg: 'bg-white', text: 'text-slate-800', accent: 'border-emerald-600', accentText: 'text-emerald-600' },
  { id: 'left-serif-classic', name: 'Editorial Left - Black', layout: 'left', font: 'font-serif', bg: 'bg-white', text: 'text-slate-900', accent: 'border-slate-800', accentText: 'text-slate-900' },
  { id: 'left-serif-navy', name: 'Editorial Left - Navy', layout: 'left', font: 'font-serif', bg: 'bg-white', text: 'text-slate-900', accent: 'border-blue-900', accentText: 'text-blue-900' },
  { id: 'left-mono-green', name: 'Terminal Coder - Green', layout: 'left', font: 'font-mono', bg: 'bg-white', text: 'text-slate-900', accent: 'border-green-600', accentText: 'text-green-600' },
  { id: 'left-mono-blue', name: 'Terminal Coder - Blue', layout: 'left', font: 'font-mono', bg: 'bg-white', text: 'text-slate-900', accent: 'border-blue-600', accentText: 'text-blue-600' },
  { id: 'left-mono-slate', name: 'Terminal Coder - Slate', layout: 'left', font: 'font-mono', bg: 'bg-white', text: 'text-slate-900', accent: 'border-slate-500', accentText: 'text-slate-700' },
  { id: 'split-right-blue', name: 'Two Column - Blue', layout: 'split-right', font: 'font-sans', bg: 'bg-slate-50', text: 'text-slate-800', accent: 'bg-blue-600', accentText: 'text-blue-600' },
  { id: 'split-right-violet', name: 'Two Column - Violet', layout: 'split-right', font: 'font-sans', bg: 'bg-slate-50', text: 'text-slate-800', accent: 'bg-violet-600', accentText: 'text-violet-600' },
  { id: 'split-right-amber', name: 'Two Column - Amber', layout: 'split-right', font: 'font-sans', bg: 'bg-slate-50', text: 'text-slate-800', accent: 'bg-amber-600', accentText: 'text-amber-600' },
  { id: 'split-right-emerald', name: 'Two Column - Emerald', layout: 'split-right', font: 'font-sans', bg: 'bg-slate-50', text: 'text-slate-800', accent: 'bg-emerald-600', accentText: 'text-emerald-600' },
  { id: 'split-right-slate', name: 'Two Column - Slate', layout: 'split-right', font: 'font-sans', bg: 'bg-slate-50', text: 'text-slate-800', accent: 'bg-slate-800', accentText: 'text-slate-800' },
  { id: 'compact-sans-slate', name: 'Dense Layout - Sans', layout: 'compact', font: 'font-sans', bg: 'bg-white', text: 'text-slate-900', accent: 'border-slate-400', accentText: 'text-slate-800' },
  { id: 'compact-serif-slate', name: 'Dense Layout - Serif', layout: 'compact', font: 'font-serif', bg: 'bg-white', text: 'text-slate-900', accent: 'border-slate-800', accentText: 'text-slate-900' },
  { id: 'hybrid-indigo', name: 'Executive Split - Indigo', layout: 'hybrid', font: 'font-sans', bg: 'bg-white', text: 'text-slate-800', accent: 'border-indigo-600', accentText: 'text-indigo-600' },
  { id: 'hybrid-teal', name: 'Executive Split - Teal', layout: 'hybrid', font: 'font-sans', bg: 'bg-white', text: 'text-slate-800', accent: 'border-teal-600', accentText: 'text-teal-600' },
  { id: 'hybrid-rose', name: 'Executive Split - Rose', layout: 'hybrid', font: 'font-sans', bg: 'bg-white', text: 'text-slate-800', accent: 'border-rose-600', accentText: 'text-rose-600' }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [usageLimits, setUsageLimits] = useState({ resume_limit_reached: false, scan_limit_reached: false });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState('sidebar-dark-blue');
  const [isPrinting, setIsPrinting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const defaultResume = {
    personal: { name: "", email: "", phone: "", title: "Software Engineer", location: "New York, USA" },
    links: [{ id: 1, label: "LinkedIn", url: "linkedin.com/in/username" }, { id: 2, label: "GitHub", url: "github.com/username" }],
    summary: "Detail-oriented Software Engineer with experience in building scalable web applications. Passionate about clean code, user experience, and continuous learning.",
    experience: [{ id: 1, title: "Frontend Developer", company: "Tech Solutions Inc.", period: "2022 - Present", desc: "Developed dynamic user interfaces using React and Tailwind CSS. Improved page load speed by 30%." }],
    projects: [{ id: 1, title: "E-Commerce Platform", techStack: "React, Node.js, Stripe", desc: "Built a fully functional e-commerce store with secure payment processing.", link: "github.com/project" }],
    education: [{ id: 1, degree: "Bachelor of Science in Computer Science", school: "State University", year: "2021" }],
    certifications: [{ id: 1, name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2023" }],
    skills: "JavaScript, React, Node.js, HTML, CSS, Git, SQL",
    achievements: "• Employee of the Month (March 2023)\n• First place in internal company Hackathon",
    languages: "English (Native), Spanish (Conversational)",
    is_deleted: false,
    ats_used: false
  };

  const [resumeData, setResumeData] = useState(defaultResume);
  const [savedResumes, setSavedResumes] = useState([]);
  const [currentResumeId, setCurrentResumeId] = useState(null);

  const [jobDescription, setJobDescription] = useState("");
  const [atsResult, setAtsResult] = useState(null);
  const [fastScore, setFastScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzingFast, setIsAnalyzingFast] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthToken(session.access_token);
        setIsAuthenticated(true);
        fetchDatabaseData(session.user.id);
        fetchLimits(session.access_token);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuthToken(session.access_token);
        setIsAuthenticated(true);
        fetchDatabaseData(session.user.id);
        fetchLimits(session.access_token);
      } else {
        setIsAuthenticated(false);
        setAuthToken(null);
        setUserProfile(null);
        setSavedResumes([]);
        setCurrentResumeId(null);
        setUsageLimits({ resume_limit_reached: false, scan_limit_reached: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchLimits = async (token) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/limits/check`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsageLimits(data);
      }
    } catch (e) {
      console.error("Failed to fetch limits:", e);
    }
  };

  const fetchDatabaseData = async (userId) => {
    try {
      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (profileData) setUserProfile(profileData);

      const { data: resumesData, error: resumesError } = await supabase.from('resumes').select('*').eq('user_id', userId).order('updated_at', { ascending: false });
      if (resumesError) throw resumesError;

      if (resumesData && resumesData.length > 0) {
        setSavedResumes(resumesData);
        // Only load into editor if it's not soft-deleted
        const activeResume = resumesData.find(r => !r.content?.is_deleted);
        if (activeResume) {
            setResumeData({ ...defaultResume, ...activeResume.content });
            setSelectedTemplate(activeResume.template_id || 'sidebar-dark-blue');
            setCurrentResumeId(activeResume.id);
        }
      } else {
        setSavedResumes([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveResumeToDatabase = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please log in to save your resume.");

      const resumePayload = {
        title: `${resumeData.personal.name || 'Untitled'}'s Resume`,
        template_id: selectedTemplate,
        content: resumeData,
        updated_at: new Date().toISOString()
      };

      if (currentResumeId) resumePayload.id = currentResumeId;

      const response = await fetch(`${API_BASE_URL}/resumes`, {
         method: 'POST',
         headers: { 
           'Content-Type': 'application/json', 
           'Authorization': `Bearer ${authToken}` 
         },
         body: JSON.stringify(resumePayload)
      });

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         throw new Error(errorData.detail || "Failed to save resume");
      }

      showNotification("Resume saved successfully!");
      fetchDatabaseData(user.id);
      fetchLimits(authToken);
    } catch (error) {
      if(error.message.includes("LIMIT REACHED") || error.message.includes("Premium") || error.message.includes("1 resume")) {
          showNotification(`Action Blocked: ${error.message}`);
          setUsageLimits(prev => ({ ...prev, resume_limit_reached: true }));
      } else {
          showNotification("Error: Could not save your resume.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const deleteResumeFromDatabase = async (id) => {
    if(!window.confirm("Are you sure you want to delete this resume? (Note: The Free Tier is limited to 1 lifetime resume).")) return;
    
    try {
      // Send soft-delete to backend
      const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
         method: 'DELETE',
         headers: { 'Authorization': `Bearer ${authToken}` }
      });

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         throw new Error(errorData.detail || "Failed to delete resume");
      }

      // Optimistically hide the resume from the Dashboard
      setSavedResumes(prevResumes => prevResumes.map(r => r.id === id ? { ...r, content: { ...r.content, is_deleted: true } } : r));
      
      if(currentResumeId === id) {
          setCurrentResumeId(null);
          setResumeData(defaultResume);
      }
      
      showNotification("Resume deleted from dashboard.");
      fetchLimits(authToken);
    } catch(err) {
      showNotification(`Error deleting resume: ${err.message}`);
    }
  }

  const handleLogout = async () => await supabase.auth.signOut();

  // --- ATS Analysis Logic ---
  const runFastScore = async () => {
    if (!jobDescription.trim()) return showNotification("Please paste a job description first.");
    setIsAnalyzingFast(true); setFastScore(null); setAtsResult(null);
    try {
      const response = await fetch(`${API_BASE_URL}/ats/score-fast`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
         body: JSON.stringify({ resume_data: resumeData, job_description: jobDescription })
      });
      if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         throw new Error(errorData.detail || "Analysis failed");
      }
      const result = await response.json();
      setFastScore(result.score);
      setUsageLimits(prev => ({ ...prev, scan_limit_reached: true })); // Immediately lock UI
      showNotification("Quick Score calculated!");
    } catch (error) {
      if (error.message.includes("Premium") || error.message.includes("LIMIT REACHED") || error.message.includes("save your profile")) {
         showNotification(`Action Blocked: ${error.message}`);
         if(error.message.includes("Scan") || error.message.includes("LIMIT REACHED")) {
             setUsageLimits(prev => ({ ...prev, scan_limit_reached: true }));
         }
      } else {
         showNotification(`API Error: ${error.message.substring(0, 50)}`);
      }
    } finally { setIsAnalyzingFast(false); }
  };

  const runAtsCheck = async () => {
    if (!jobDescription.trim()) return showNotification("Please paste a job description first.");
    setIsAnalyzing(true); setAtsResult(null);
    try {
      const response = await fetch(`${API_BASE_URL}/ats/analyze`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
         body: JSON.stringify({ resume_data: resumeData, job_description: jobDescription })
      });
      if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         throw new Error(errorData.detail || "Network error");
      }
      const result = await response.json();
      setAtsResult(result); setFastScore(null);
      setUsageLimits(prev => ({ ...prev, scan_limit_reached: true })); // Immediately lock UI
      showNotification("Detailed Analysis complete!");
    } catch (error) {
      if (error.message.includes("Premium") || error.message.includes("LIMIT REACHED") || error.message.includes("save your profile")) {
         showNotification(`Action Blocked: ${error.message}`);
         if(error.message.includes("Scan") || error.message.includes("LIMIT REACHED")) {
             setUsageLimits(prev => ({ ...prev, scan_limit_reached: true }));
         }
      } else {
         showNotification(`API Error: ${error.message.substring(0, 50)}`);
      }
    } finally { setIsAnalyzing(false); }
  };

  const handlePrint = () => { setIsPrinting(true); setTimeout(() => { window.print(); setIsPrinting(false); }, 100); };
  const showNotification = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 5000); };

  // --- UI Handlers ---
  const handleUpdateField = (section, field, value) => setResumeData(prev => ({...prev, [section]: { ...prev[section], [field]: value }}));
  const handleUpdateArray = (section, id, field, value) => setResumeData(prev => ({...prev, [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)}));
  const handleAddArrayItem = (section, defaultItem) => setResumeData(prev => ({...prev, [section]: [...(prev[section] || []), { id: Date.now(), ...defaultItem }]}));
  const handleRemoveArrayItem = (section, id) => setResumeData(prev => ({...prev, [section]: prev[section].filter(item => item.id !== id)}));

  if (!isAuthenticated) return <AuthView />;

  const userDisplayName = userProfile?.full_name || userProfile?.email?.split('@')[0] || "User";
  
  // Filter out deleted resumes from the view, but let usageLimits strictly determine if they hit the lifetime cap
  const activeResumes = savedResumes.filter(r => !r.content?.is_deleted);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      <style>{`
        body { margin: 0; font-family: 'Inter', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scanner {
          animation: scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .print-container { width: 100%; max-width: none; margin: 0; padding: 0; box-shadow: none; border: none; }
          @page { margin: 0; size: A4 portrait; }
        }
      `}</style>

      {/* Clean, Premium Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 no-print border-b border-slate-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 p-1.5 rounded-lg shadow-[0_2px_10px_rgba(79,70,229,0.3)]">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">ResumeKaro</span>
            </div>
            {/* Mobile Log out */}
            <button onClick={handleLogout} className="sm:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all">
              <LogOut className="w-4 h-4"/>
            </button>
          </div>
          
          <div className="flex bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto justify-center sm:justify-start overflow-x-auto shadow-inner">
            <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<Briefcase className="w-4 h-4"/>} label={<span className="inline">My Resumes</span>} />
            <NavButton active={activeTab === 'ats'} onClick={() => setActiveTab('ats')} icon={<Target className="w-4 h-4"/>} label={<span className="inline">ATS Analyzer</span>} />
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Hi, <span className="font-bold text-slate-900">{userDisplayName}</span></span>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <LogOut className="w-4 h-4"/> <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Premium Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 lg:bottom-16 lg:top-auto lg:right-6 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] z-[100] flex items-center gap-3 animate-in fade-in slide-in-from-top-5 lg:slide-in-from-bottom-5 no-print max-w-md border border-slate-700">
          {notification.includes('Blocked') ? <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />}
          <p className="text-sm font-medium leading-snug">{notification}</p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative z-10 no-print h-auto lg:h-[calc(100vh-4rem-3rem)]">
        {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} savedResumes={activeResumes} setCurrentResumeId={setCurrentResumeId} setResumeData={setResumeData} setSelectedTemplate={setSelectedTemplate} defaultResume={defaultResume} showNotification={showNotification} deleteResumeFromDatabase={deleteResumeFromDatabase} isResumeLimitReached={usageLimits.resume_limit_reached} />}
        {activeTab === 'builder' && (
          <BuilderView 
            data={resumeData} handleUpdateField={handleUpdateField} handleUpdateArray={handleUpdateArray}
            handleAddArrayItem={handleAddArrayItem} handleRemoveArrayItem={handleRemoveArrayItem}
            setResumeData={setResumeData} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate}
            handlePrint={handlePrint} saveResumeToDatabase={saveResumeToDatabase} isSaving={isSaving}
            isResumeLimitReached={usageLimits.resume_limit_reached} currentResumeId={currentResumeId} 
            setActiveTab={setActiveTab} showNotification={showNotification}
          />
        )}
        {activeTab === 'ats' && (
          <ATSCheckerView jobDescription={jobDescription} setJobDescription={setJobDescription} runAtsCheck={runAtsCheck} isAnalyzing={isAnalyzing} result={atsResult} runFastScore={runFastScore} fastScore={fastScore} isAnalyzingFast={isAnalyzingFast} showNotification={showNotification} scanLimitReached={usageLimits.scan_limit_reached} />
        )}
      </main>

      {/* Strict Limitation Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 py-3 text-center text-xs no-print z-50 flex-shrink-0 mt-auto">
        <p className="max-w-4xl mx-auto px-4 font-medium tracking-wide flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-slate-400 mb-0.5"/> <span>FREE TIER:</span></span> 
          <span>Accounts are limited to a lifetime total of <b className="text-slate-800">1 Resume</b> and <b className="text-slate-800">1 Scan</b>.</span>
          <a href="#" onClick={(e) => { e.preventDefault(); showNotification("Premium Upgrade coming soon!"); }} className="text-indigo-600 hover:text-indigo-800 font-semibold mt-1 sm:mt-0 transition-colors">Upgrade to Premium</a>
        </p>
      </footer>

      {/* Hidden Print Container */}
      <div className={`${isPrinting ? 'block' : 'hidden'} print-container bg-white w-full h-full absolute top-0 left-0 z-[100]`}>
        <DynamicResumeTemplate data={resumeData} templateId={selectedTemplate} />
      </div>
    </div>
  );
}

// --- Components ---

const NavButton = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex-shrink-0 ${active ? 'bg-white text-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}>
    {icon} {label}
  </button>
);

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
        if (error) throw error;
        if (data?.user && fullName) await supabase.from('profiles').update({ full_name: fullName }).eq('id', data.user.id);
        alert("Account created successfully. Please log in.");
        setIsLogin(true);
      }
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Animated Soft Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 relative z-10">
        <div className="flex flex-col items-center justify-center gap-4 mb-10">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-4 rounded-2xl shadow-[0_4px_20px_rgba(79,70,229,0.3)]">
             <FileText className="w-8 h-8 text-white" />
          </div>
          <span className="font-extrabold text-3xl text-slate-900 tracking-tight">ResumeKaro</span>
        </div>
        
        <h2 className="text-lg font-bold text-center text-slate-800 mb-6">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        {error && <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl text-center flex items-center justify-center gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0"/> {error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
              <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 font-medium" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 font-medium" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 font-medium" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] transition-all mt-6 flex items-center justify-center">
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>
        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">{isLogin ? 'Sign up' : 'Log in'}</button>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ setActiveTab, savedResumes, setCurrentResumeId, setResumeData, setSelectedTemplate, defaultResume, showNotification, deleteResumeFromDatabase, isResumeLimitReached }) => (
  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 overflow-y-auto flex-grow">
    <div className="mb-8 sm:mb-12 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">My Resumes</h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base font-medium">Manage, edit, and create your professional resumes.</p>
      </div>
      <button 
        onClick={() => {
          if(isResumeLimitReached) {
            showNotification("LIFETIME LIMIT REACHED: You can only create 1 resume on the Free Tier. Upgrade to Premium for unlimited resumes.");
            return;
          }
          setCurrentResumeId(null);
          setResumeData(defaultResume);
          setActiveTab('builder');
        }} 
        disabled={isResumeLimitReached}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm ${isResumeLimitReached ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5'}`}
      >
        {isResumeLimitReached ? <Lock className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        {isResumeLimitReached ? 'Lifetime Limit Reached (1/1)' : 'Create New Resume'}
      </button>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {savedResumes.length > 0 ? savedResumes.map(r => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between h-56 group relative transform hover:-translate-y-1">
              <button 
                onClick={(e) => { e.stopPropagation(); deleteResumeFromDatabase(r.id); }}
                className="absolute top-6 right-6 text-slate-300 hover:text-red-500 bg-white hover:bg-red-50 p-2 rounded-lg transition-colors z-10"
                title="Hide Resume"
              >
                <Trash2 className="w-4 h-4"/>
              </button>
              <div className="pr-10">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-indigo-500" />
                </div>
                <h4 className="font-extrabold text-xl text-slate-900 mb-1 truncate group-hover:text-indigo-600 transition-colors">{r.title}</h4>
                <div className="flex flex-col gap-1.5 mb-4">
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 w-fit px-2.5 py-1 rounded-md truncate max-w-full">{TEMPLATES.find(t => t.id === r.template_id)?.name || 'Custom Theme'}</span>
                  <span className="text-xs font-medium text-slate-400">Last edited: {new Date(r.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setResumeData({...defaultResume, ...r.content});
                  setSelectedTemplate(r.template_id);
                  setCurrentResumeId(r.id);
                  setActiveTab('builder');
                }} 
                className="w-full py-3 text-sm font-bold text-indigo-600 bg-indigo-50/50 border border-indigo-100 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors mt-auto"
              >
                Edit Resume
              </button>
          </div>
      )) : (
          <div className="col-span-full flex flex-col items-center justify-center text-slate-500 py-16 sm:py-24 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <FileText className="w-8 h-8 text-slate-300"/>
            </div>
            <p className="text-xl font-bold text-slate-800 mb-2">No active resumes found.</p>
            {isResumeLimitReached ? (
               <p className="text-sm px-4 text-amber-600 font-medium">You have already used your 1 free lifetime resume slot.</p>
            ) : (
               <p className="text-sm px-4 text-slate-500 font-medium">Click 'Create New Resume' to get started.</p>
            )}
          </div>
      )}
    </div>
  </div>
);

const BuilderView = ({ data, handleUpdateField, handleUpdateArray, handleAddArrayItem, handleRemoveArrayItem, setResumeData, selectedTemplate, setSelectedTemplate, handlePrint, saveResumeToDatabase, isSaving, isResumeLimitReached, currentResumeId, setActiveTab, showNotification }) => {
  const isLocked = isResumeLimitReached && !currentResumeId;

  return (
    <div className="w-full flex flex-col lg:flex-row h-full overflow-hidden bg-slate-50">
      {/* Editor Side */}
      <div className="w-full lg:w-5/12 bg-white lg:border-r border-slate-200 overflow-y-auto custom-scrollbar flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        
        {isLocked && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
             <div className="bg-slate-100 p-5 rounded-full mb-5 shadow-inner border border-slate-200">
               <Lock className="w-10 h-10 text-slate-400" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-2">Editor Locked</h3>
             <p className="text-sm text-slate-500 mb-8 max-w-sm font-medium leading-relaxed">Lifetime free tier limit reached (1/1 Resumes). Please edit your existing resume from the Dashboard or upgrade to Premium.</p>
             <button onClick={() => setActiveTab('dashboard')} className="w-full sm:w-auto bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-8 rounded-xl shadow-sm transition-all mb-3">
               Go to Dashboard
             </button>
             <button onClick={() => showNotification("Premium Upgrade coming soon!")} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] transition-all flex items-center justify-center gap-2">
               <Sparkles className="w-5 h-5 text-indigo-200" /> Unlock Premium
             </button>
          </div>
        )}

        <div className={`p-5 sm:p-8 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isLocked ? 'opacity-20 pointer-events-none select-none filter blur-sm' : ''}`}>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">Resume Editor</h2>
          <select 
            value={selectedTemplate} 
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="text-sm font-bold px-4 py-2.5 rounded-xl bg-slate-50 text-slate-800 outline-none border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 w-full sm:w-auto truncate transition-all cursor-pointer"
          >
            {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        
        <div className={`p-5 sm:p-8 space-y-8 sm:space-y-10 flex-grow pb-24 lg:pb-8 ${isLocked ? 'opacity-20 pointer-events-none select-none filter blur-sm' : ''}`}>
            <Section title="Personal Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="Full Name" value={data.personal.name} onChange={(e) => handleUpdateField('personal', 'name', e.target.value)} />
                <Input label="Job Title" value={data.personal.title} onChange={(e) => handleUpdateField('personal', 'title', e.target.value)} />
                <Input label="Email Address" value={data.personal.email} onChange={(e) => handleUpdateField('personal', 'email', e.target.value)} />
                <Input label="Phone Number" value={data.personal.phone} onChange={(e) => handleUpdateField('personal', 'phone', e.target.value)} />
                <div className="sm:col-span-2"><Input label="Location (City, Country)" value={data.personal.location} onChange={(e) => handleUpdateField('personal', 'location', e.target.value)} /></div>
              </div>
            </Section>

            <Section title="Social & Portfolio Links">
              {(data.links || []).map(link => (
                 <div key={link.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 items-start sm:items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="w-full sm:flex-1"><Input label="Platform (e.g., LinkedIn)" value={link.label} onChange={(e) => handleUpdateArray('links', link.id, 'label', e.target.value)} /></div>
                   <div className="w-full sm:flex-1"><Input label="URL" value={link.url} onChange={(e) => handleUpdateArray('links', link.id, 'url', e.target.value)} /></div>
                   <button onClick={() => handleRemoveArrayItem('links', link.id)} className="text-slate-400 hover:text-red-500 sm:mt-6 self-end sm:self-auto bg-white hover:bg-red-50 p-2 rounded-lg transition-colors border border-slate-200"><Trash2 className="w-4 h-4"/></button>
                 </div>
              ))}
              <button onClick={() => handleAddArrayItem('links', { label: 'Portfolio', url: 'link.com' })} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 mt-2 bg-indigo-50 px-4 py-2 rounded-xl transition-colors"><Plus className="w-4 h-4"/> Add Link</button>
            </Section>

            <Section title="Professional Summary">
               <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-y min-h-[120px] text-slate-800 placeholder-slate-400 font-medium transition-all" placeholder="Briefly describe your expertise and career goals..." value={data.summary} onChange={(e) => setResumeData(prev => ({...prev, summary: e.target.value}))} />
            </Section>

            <Section title="Work Experience">
              {(data.experience || []).map(exp => (
                <div key={exp.id} className="p-5 border border-slate-100 rounded-3xl bg-slate-50 mb-5 relative">
                   <button onClick={() => handleRemoveArrayItem('experience', exp.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 bg-white hover:bg-red-50 p-2 rounded-lg transition-colors border border-slate-200 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-10">
                     <Input label="Job Title" value={exp.title} onChange={(e) => handleUpdateArray('experience', exp.id, 'title', e.target.value)} />
                     <Input label="Company Name" value={exp.company} onChange={(e) => handleUpdateArray('experience', exp.id, 'company', e.target.value)} />
                     <div className="sm:col-span-2"><Input label="Dates (e.g., Jan 2020 - Present)" value={exp.period} onChange={(e) => handleUpdateArray('experience', exp.id, 'period', e.target.value)} /></div>
                   </div>
                   <textarea className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-y min-h-[100px] font-medium transition-all" value={exp.desc} onChange={(e) => handleUpdateArray('experience', exp.id, 'desc', e.target.value)} placeholder="Describe your key responsibilities and achievements..." />
                </div>
              ))}
              <button onClick={() => handleAddArrayItem('experience', { title: "", company: "", period: "", desc: "" })} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 bg-indigo-50 px-4 py-2 rounded-xl transition-colors"><Plus className="w-4 h-4"/> Add Experience</button>
            </Section>

            <Section title="Projects">
              {(data.projects || []).map(proj => (
                <div key={proj.id} className="p-5 border border-slate-100 rounded-3xl bg-slate-50 mb-5 relative">
                   <button onClick={() => handleRemoveArrayItem('projects', proj.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 bg-white hover:bg-red-50 p-2 rounded-lg transition-colors border border-slate-200 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-10">
                     <Input label="Project Name" value={proj.title} onChange={(e) => handleUpdateArray('projects', proj.id, 'title', e.target.value)} />
                     <Input label="Technologies Used" value={proj.techStack} onChange={(e) => handleUpdateArray('projects', proj.id, 'techStack', e.target.value)} />
                     <div className="sm:col-span-2"><Input label="Project Link (Optional)" value={proj.link} onChange={(e) => handleUpdateArray('projects', proj.id, 'link', e.target.value)} /></div>
                   </div>
                   <textarea className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-y min-h-[100px] font-medium transition-all" value={proj.desc} onChange={(e) => handleUpdateArray('projects', proj.id, 'desc', e.target.value)} placeholder="Describe the project..." />
                </div>
              ))}
              <button onClick={() => handleAddArrayItem('projects', { title: "", techStack: "", desc: "", link: "" })} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 bg-indigo-50 px-4 py-2 rounded-xl transition-colors"><Plus className="w-4 h-4"/> Add Project</button>
            </Section>

            <Section title="Education">
              {(data.education || []).map(edu => (
                <div key={edu.id} className="p-5 border border-slate-100 rounded-3xl bg-slate-50 mb-5 relative">
                   <button onClick={() => handleRemoveArrayItem('education', edu.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 bg-white hover:bg-red-50 p-2 rounded-lg transition-colors border border-slate-200 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                     <div className="sm:col-span-2"><Input label="Degree & Major" value={edu.degree} onChange={(e) => handleUpdateArray('education', edu.id, 'degree', e.target.value)} /></div>
                     <Input label="School / University" value={edu.school} onChange={(e) => handleUpdateArray('education', edu.id, 'school', e.target.value)} />
                     <Input label="Graduation Year" value={edu.year} onChange={(e) => handleUpdateArray('education', edu.id, 'year', e.target.value)} />
                   </div>
                </div>
              ))}
              <button onClick={() => handleAddArrayItem('education', { degree: "", school: "", year: "" })} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 bg-indigo-50 px-4 py-2 rounded-xl transition-colors"><Plus className="w-4 h-4"/> Add Education</button>
            </Section>

            <Section title="Certifications">
              {(data.certifications || []).map(cert => (
                <div key={cert.id} className="p-5 border border-slate-100 rounded-3xl bg-slate-50 mb-5 relative">
                   <button onClick={() => handleRemoveArrayItem('certifications', cert.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 bg-white hover:bg-red-50 p-2 rounded-lg transition-colors border border-slate-200 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                     <div className="sm:col-span-2"><Input label="Certification Name" value={cert.name} onChange={(e) => handleUpdateArray('certifications', cert.id, 'name', e.target.value)} /></div>
                     <Input label="Issuing Organization" value={cert.issuer} onChange={(e) => handleUpdateArray('certifications', cert.id, 'issuer', e.target.value)} />
                     <Input label="Year Issued" value={cert.year} onChange={(e) => handleUpdateArray('certifications', cert.id, 'year', e.target.value)} />
                   </div>
                </div>
              ))}
              <button onClick={() => handleAddArrayItem('certifications', { name: "", issuer: "", year: "" })} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 bg-indigo-50 px-4 py-2 rounded-xl transition-colors"><Plus className="w-4 h-4"/> Add Certification</button>
            </Section>

            <Section title="Skills & Languages">
               <div className="space-y-5">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Technical Skills (Comma separated)</label>
                   <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-y min-h-[100px] font-medium transition-all placeholder-slate-400" placeholder="e.g., JavaScript, React, Python, SQL" value={data.skills} onChange={(e) => setResumeData(prev => ({...prev, skills: e.target.value}))} />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Languages (Comma separated)</label>
                   <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-y min-h-[80px] font-medium transition-all placeholder-slate-400" placeholder="e.g., English (Fluent), Spanish (Basic)" value={data.languages || ""} onChange={(e) => setResumeData(prev => ({...prev, languages: e.target.value}))} />
                 </div>
               </div>
            </Section>
            
            <Section title="Key Achievements">
               <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-y min-h-[120px] font-medium transition-all placeholder-slate-400" value={data.achievements || ""} onChange={(e) => setResumeData(prev => ({...prev, achievements: e.target.value}))} placeholder="• Won employee of the year 2023..." />
            </Section>
        </div>
      </div>
      
      {/* Preview Side */}
      <div className={`w-full lg:w-7/12 bg-slate-100/50 p-4 sm:p-10 overflow-y-auto custom-scrollbar flex flex-col items-center relative z-10 border-t lg:border-t-0 border-slate-200 ${isLocked ? 'opacity-20 filter blur-sm pointer-events-none' : ''}`}>
        <div className="w-full flex flex-col sm:flex-row justify-end mb-8 max-w-[850px] gap-4">
          <button onClick={saveResumeToDatabase} disabled={isSaving || isLocked} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm disabled:opacity-50">
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />} Save Progress
          </button>
          <button onClick={handlePrint} disabled={isLocked} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
        <div className="bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-[850px] aspect-[1/1.414] origin-top overflow-hidden border border-slate-200 lg:scale-[0.85] xl:scale-95 transition-transform mb-12 lg:mb-0">
          <DynamicResumeTemplate data={data} templateId={selectedTemplate} />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="bg-white">
    <h3 className="text-xl font-extrabold text-slate-900 mb-6">{title}</h3>
    {children}
  </section>
);

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 font-medium" value={value || ""} onChange={onChange} />
  </div>
);

// --- Dynamic 50-Layout ATS Template Engine ---
const DynamicResumeTemplate = ({ data, templateId }) => {
  const config = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
  const skillsArr = data.skills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const langArr = data.languages?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const linksArr = data.links || [];
  const expArr = data.experience || [];
  const projArr = data.projects || [];
  const certArr = data.certifications || [];
  const achieveText = data.achievements || "";

  const renderContactLinks = (styleClass) => (
    <div className={styleClass}>
      {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map((t,i) => <span key={`c${i}`}>{t}</span>)}
      {linksArr.map(l => <span key={l.id}>{l.url}</span>)}
    </div>
  );

  const SectionHeading = ({ title }) => (
    <h2 className={`uppercase font-bold tracking-wider mb-3 pb-1 border-b-2 ${config.accent} ${config.layout.includes('sidebar') ? 'text-current border-current/30' : config.accentText}`}>{title}</h2>
  );

  const renderContentBlocks = () => (
    <>
      {data.summary && (
        <div className="mb-6"><SectionHeading title="Summary" /><p className="text-sm leading-relaxed text-justify">{data.summary}</p></div>
      )}
      {expArr.length > 0 && (
        <div className="mb-6"><SectionHeading title="Experience" />
          <div className="space-y-4">
            {expArr.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5"><h3 className="font-bold text-sm">{exp.title}</h3><span className="text-xs font-semibold">{exp.period}</span></div>
                <div className={`text-sm font-medium mb-1.5 ${config.accentText}`}>{exp.company}</div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {projArr.length > 0 && (
        <div className="mb-6"><SectionHeading title="Projects" />
          <div className="space-y-4">
            {projArr.map(p => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-sm">{p.title} {p.link && <span className="font-normal text-xs ml-2 opacity-80">({p.link})</span>}</h3>
                </div>
                <div className={`text-xs font-semibold mb-1.5 ${config.accentText}`}>{p.techStack}</div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {(data.education || []).length > 0 && (
        <div className="mb-6"><SectionHeading title="Education" />
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div><h3 className="font-bold text-sm">{edu.degree}</h3><div className="text-sm">{edu.school}</div></div>
                <div className="text-xs font-semibold">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {achieveText && (
        <div className="mb-6"><SectionHeading title="Achievements" /><p className="text-sm leading-relaxed whitespace-pre-wrap">{achieveText}</p></div>
      )}
    </>
  );

  const renderSideBlocks = () => (
    <>
      <div className="mb-6"><SectionHeading title="Skills" />
        <div className="flex flex-wrap gap-1.5">
          {skillsArr.map((s, i) => <span key={i} className={`text-xs px-2 py-1 rounded ${config.layout.includes('sidebar') && config.bg !== 'bg-white' ? 'bg-white/10' : 'bg-slate-100 text-slate-800'}`}>{s}</span>)}
        </div>
      </div>
      {certArr.length > 0 && (
        <div className="mb-6"><SectionHeading title="Certifications" />
          <div className="space-y-2">
            {certArr.map(c => <div key={c.id}><div className="font-bold text-sm">{c.name}</div><div className="text-xs opacity-80">{c.issuer} • {c.year}</div></div>)}
          </div>
        </div>
      )}
      {langArr.length > 0 && (
        <div className="mb-6"><SectionHeading title="Languages" />
          <ul className="text-sm space-y-1 list-disc list-inside ml-2">{langArr.map((l, i) => <li key={i}>{l}</li>)}</ul>
        </div>
      )}
    </>
  );

  const containerClass = `w-full h-full box-border ${config.font} ${config.layout === 'sidebar-left' || config.layout === 'sidebar-left-light' ? 'flex bg-white' : config.bg + ' ' + config.text}`;

  if (config.layout.includes('center')) {
    return (
      <div className={`${containerClass} p-8 sm:p-12`}>
        <div className={`text-center border-b-4 ${config.accent} pb-6 mb-8`}>
          <h1 className={`text-4xl sm:text-5xl ${config.layout === 'center-bold' ? 'font-black' : 'font-bold'} uppercase tracking-tight mb-2`}>{data.personal.name}</h1>
          <p className={`text-lg sm:text-xl ${config.accentText} ${config.layout === 'center-bold' ? 'font-bold' : 'italic'} mb-3`}>{data.personal.title}</p>
          {renderContactLinks("text-xs sm:text-sm flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-1 opacity-80")}
        </div>
        {renderContentBlocks()}
        {renderSideBlocks()}
      </div>
    );
  }

  if (config.layout === 'left' || config.layout === 'compact') {
    return (
      <div className={`${containerClass} ${config.layout === 'compact' ? 'p-6 sm:p-8 text-xs' : 'p-8 sm:p-12'}`}>
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-200 pb-6 gap-4">
          <div>
            <h1 className={`text-4xl sm:text-5xl font-black tracking-tight mb-2 ${config.accentText}`}>{data.personal.name}</h1>
            <p className="text-xl sm:text-2xl font-medium opacity-80">{data.personal.title}</p>
          </div>
          <div className="text-left sm:text-right text-xs sm:text-sm opacity-80 flex flex-col items-start sm:items-end gap-1">
            {renderContactLinks("flex flex-col items-start sm:items-end gap-1")}
          </div>
        </div>
        <div className={config.layout === 'compact' ? 'space-y-4' : 'space-y-6'}>
           {renderContentBlocks()}
           {renderSideBlocks()}
        </div>
      </div>
    );
  }

  if (config.layout === 'hybrid') {
     return (
       <div className={`${containerClass} p-8 sm:p-12`}>
         <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black mb-2">{data.personal.name}</h1>
            <p className={`text-lg sm:text-xl font-bold ${config.accentText} mb-4`}>{data.personal.title}</p>
            {renderContactLinks("text-sm flex flex-wrap gap-x-4 gap-y-1 opacity-80 font-medium")}
         </div>
         <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 border-t-2 border-slate-200 pt-8">
            <div className="w-full sm:w-[65%]">{renderContentBlocks()}</div>
            <div className="w-full sm:w-[35%]">{renderSideBlocks()}</div>
         </div>
       </div>
     );
  }

  if (config.layout === 'split-right') {
     return (
       <div className={`${containerClass} flex flex-col sm:flex-row`}>
         <div className="w-full sm:w-[65%] p-8 sm:p-10 bg-white">
            <h1 className="text-4xl sm:text-5xl font-black mb-2">{data.personal.name}</h1>
            <p className={`text-lg sm:text-xl font-bold mb-8 ${config.accentText}`}>{data.personal.title}</p>
            {renderContentBlocks()}
         </div>
         <div className={`w-full sm:w-[35%] p-8 sm:p-10 ${config.accent} text-white`}>
            {renderContactLinks("flex flex-col gap-2 text-sm mb-10 opacity-90")}
            {renderSideBlocks()}
         </div>
       </div>
     );
  }

  return (
    <div className={`${containerClass} flex flex-col sm:flex-row`}>
      <div className={`w-full sm:w-[35%] p-6 sm:p-10 flex flex-col h-auto sm:h-full relative ${config.bg} ${config.text}`}>
        <div className={`hidden sm:block w-12 h-1.5 ${config.accent} mb-6 rounded-full`}></div>
        <h1 className="text-3xl sm:text-4xl font-black mb-2 leading-tight">{data.personal.name}</h1>
        <p className={`font-bold tracking-wide mb-8 sm:mb-10 ${config.layout.includes('light') ? config.accentText : 'text-current opacity-80'}`}>{data.personal.title}</p>
        
        <div className="mb-8 sm:mb-10 space-y-2 text-sm opacity-90">
           {renderContactLinks("flex flex-col gap-2")}
        </div>
        {renderSideBlocks()}
      </div>
      <div className="w-full sm:w-[65%] p-6 sm:p-10 bg-white text-slate-800">
        {renderContentBlocks()}
      </div>
    </div>
  );
};

const ATSCheckerView = ({ jobDescription, setJobDescription, runAtsCheck, isAnalyzing, result, runFastScore, fastScore, isAnalyzingFast, showNotification, scanLimitReached }) => {
  const [inputMode, setInputMode] = useState('text');
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsExtracting(true);
    const formData = new FormData(); formData.append('file', file);
    try {
      const res = await fetch(`${API_BASE_URL}/utils/extract-text`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error("Document extraction failed");
      const data = await res.json();
      setJobDescription(data.text); setInputMode('text'); 
      showNotification("Document text imported successfully!");
    } catch (err) { showNotification(err.message); } finally { setIsExtracting(false); if(fileInputRef.current) fileInputRef.current.value = ''; }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row gap-8 overflow-y-auto flex-grow">
      {/* Left side: JD Input with Lock Overlay */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        
        {scanLimitReached && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center rounded-3xl border border-slate-200/50 p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <div className="bg-slate-100 p-5 rounded-full mb-5 shadow-inner border border-slate-200">
               <Lock className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Scanner Locked</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm font-medium leading-relaxed">Lifetime free tier limit reached (1/1 Scans). Unlock unlimited AI semantic analysis with Premium.</p>
            <button onClick={() => showNotification("Premium Upgrade coming soon!")} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-200" /> Unlock Premium
            </button>
          </div>
        )}

        <div className={`flex flex-col h-full ${scanLimitReached ? 'opacity-20 pointer-events-none select-none filter blur-sm transition-all duration-500' : ''}`}>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Resume Analyzer</h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base font-medium">Compare your resume against a job description to get a match score and tips.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-grow flex flex-col overflow-hidden border border-slate-100">
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button onClick={() => setInputMode('text')} className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all ${inputMode === 'text' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>Paste Text</button>
              <button onClick={() => setInputMode('file')} className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all flex justify-center items-center gap-2 ${inputMode === 'file' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>Upload Document</button>
            </div>
            <div className="p-6 sm:p-8 flex-grow flex flex-col bg-white">
              {inputMode === 'text' ? (
                <textarea className="w-full flex-grow bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none min-h-[200px] sm:min-h-[250px] custom-scrollbar text-slate-800 placeholder-slate-400 transition-all font-medium" placeholder="Paste the job description here..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
              ) : (
                <div className="flex-grow border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-50 hover:bg-slate-100 hover:border-indigo-300 transition-all cursor-pointer group" onClick={() => fileInputRef.current.click()}>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" />
                  {isExtracting ? <RefreshCw className="w-10 h-10 animate-spin text-indigo-500" /> : <UploadCloud className="w-14 h-14 text-slate-300 group-hover:text-indigo-500 group-hover:-translate-y-1 transition-all duration-300" />}
                  <p className="mt-4 text-sm font-bold text-slate-700">Click to select a file</p>
                  <p className="text-xs text-slate-400 mt-1.5 font-medium">PDF, DOCX, TXT</p>
                </div>
              )}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button onClick={runFastScore} disabled={isAnalyzing || isAnalyzingFast || isExtracting} className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-bold py-3.5 rounded-xl shadow-sm transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                  {isAnalyzingFast ? <RefreshCw className="w-4 h-4 animate-spin text-slate-500" /> : <Zap className="w-4 h-4 text-amber-500" />} Quick Score
                </button>
                <button onClick={runAtsCheck} disabled={isAnalyzing || isAnalyzingFast || isExtracting} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                  {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <FileSearch className="w-4 h-4 text-white" />} Detailed Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Results */}
      <div className="w-full lg:w-1/2 relative min-h-[400px] mb-8 lg:mb-0 flex-grow">
          {!result && !fastScore && !isAnalyzing && !isAnalyzingFast && (
            <div className="h-full border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-10 text-center bg-slate-50/50">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <Target className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Analyze</h3>
              <p className="text-sm text-slate-500 max-w-xs font-medium leading-relaxed">Select 'Quick Score' for an instant match percentage, or 'Detailed Analysis' for tips and missing keywords.</p>
            </div>
          )}

          {(isAnalyzing || isAnalyzingFast) && (
            <div className="h-full bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
               {/* Premium Scanning Animation */}
               <div className="relative w-28 h-36 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center mb-8 shadow-inner">
                 <FileText className="w-12 h-12 text-slate-300" />
                 <div className="absolute inset-0 w-full h-full">
                    <div className="w-full h-12 bg-gradient-to-b from-transparent via-indigo-500/20 to-indigo-500/40 border-b-2 border-indigo-500 absolute top-0 left-0 animate-scanner shadow-[0_4px_15px_rgba(79,70,229,0.3)]"></div>
                 </div>
               </div>
               <h3 className="text-xl font-extrabold text-slate-900 mb-2">{isAnalyzingFast ? "Calculating semantic match..." : "Scanning document matrices..."}</h3>
               <p className="text-sm text-slate-500 font-medium animate-pulse">Comparing your resume against the job description.</p>
            </div>
          )}

          {fastScore !== null && !result && !isAnalyzingFast && (
             <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 flex flex-col items-center justify-center text-center h-full animate-in zoom-in duration-300">
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Match Score</h3>
                <p className="text-sm text-slate-500 mb-10 font-medium">Calculated instantly using AI semantic matching.</p>
                <div className="relative w-56 h-56 flex items-center justify-center mb-10">
                    {/* Soft glowing background behind ring */}
                    <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${fastScore > 75 ? 'bg-emerald-500' : fastScore > 50 ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                    <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 36 36">
                      <path className="text-slate-100" strokeWidth="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className={`${fastScore > 75 ? 'text-emerald-500' : fastScore > 50 ? 'text-amber-500' : 'text-slate-300'} transition-all duration-1000 ease-out`} strokeDasharray={`${fastScore}, 100`} strokeWidth="2.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-6xl font-black text-slate-900 z-20 tracking-tighter">{fastScore}<span className="text-3xl text-slate-400 font-bold">%</span></span>
                </div>
                <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/50 max-w-sm">
                  <p className="text-sm text-indigo-900 font-medium leading-relaxed">This is a quick estimate. Run a <b className="text-indigo-700">Detailed Analysis</b> to extract missing keywords and get actionable tips.</p>
                </div>
             </div>
          )}

          {result && !isAnalyzing && (
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden h-full flex flex-col animate-in slide-in-from-right-8">
                 <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                   <div>
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Match Score</h3>
                     <div className="text-4xl font-black text-slate-900 tracking-tight">{result.score}%</div>
                   </div>
                   <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-200" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path 
                          className={`${result.score > 75 ? 'text-emerald-500' : result.score > 50 ? 'text-amber-500' : 'text-red-500'} animate-[stroke_1s_ease-out]`}
                          strokeDasharray={`${result.score}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        />
                      </svg>
                   </div>
                 </div>
                 
                 <div className="p-6 sm:p-8 space-y-8 flex-grow overflow-y-auto custom-scrollbar bg-white">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500"/> Matching Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedSkills?.map((s,i) => <span key={i} className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/50 shadow-sm">{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-500"/> Missing Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.missingSkills?.map((s,i) => <span key={i} className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200/50 shadow-sm">{s}</span>)}
                      </div>
                    </div>
                    <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100">
                      <h4 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-500"/> Improvement Tips</h4>
                      <ul className="space-y-3">
                        {result.optimizationTips?.map((t,i) => (
                          <li key={i} className="text-sm text-slate-700 font-medium flex items-start gap-3 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0"></span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>
              </div>
          )}
      </div>
    </div>
  );
};