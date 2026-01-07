import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";
import CustomSignIn from "./pages/CustomSignIn";
import CustomSignUp from "./pages/CustomSignUp";
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Toaster />
            <Routes>
                {/* Public route - Landing page */}
                <Route path="/" element={<LandingPage />}/>
                
                {/* Protected dashboard routes */}
                <Route path="/dashboard" element={
                    <>
                        <SignedIn>
                            <Layout />
                        </SignedIn>
                        <SignedOut>
                            <Navigate to="/sign-in" replace />
                        </SignedOut>
                    </>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="team" element={<Team />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projectsDetail" element={<ProjectDetails />} />
                    <Route path="taskDetails" element={<TaskDetails />} />
                </Route>
                
                {/* Custom Sign in page */}
                <Route path="/sign-in" element={<CustomSignIn />} />
                
                {/* Custom Sign up page */}
                <Route path="/sign-up" element={<CustomSignUp />} />
                
                {/* Catch all route for signed out users trying to access protected routes */}
                <Route path="*" element={<Navigate to="/sign-in" replace />} />
            </Routes>
        </>
    );
};

export default App;
