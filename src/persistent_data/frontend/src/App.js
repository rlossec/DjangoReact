import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import UnauthorizedPage from './pages/UnauthorizedPage'

import LoginPage from './pages/authentication/LoginPage'
import LogoutPage from './pages/authentication/LogoutPage'
import RegisterPage from './pages/authentication/RegisterPage'
import PasswordResetPage from './pages/authentication/PasswordResetPage'
import PasswordResetConfirmPage from './pages/authentication/PasswordResetConfirmPage'

import ProfilePage from './pages/profile/ProfilePage'
import PasswordChangePage from './pages/profile/PasswordChangePage'
import EmailChangePage from './pages/profile/EmailChangePage'

import ProtectedRoute from './utils/ProtectedRoute';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

            <Route path="/login/" element={<LoginPage />} />
            <Route path="/logout/" element={<LogoutPage />} />
            <Route path="/register/" element={<RegisterPage />} />

            <Route path="/auth/password/reset/" element={<PasswordResetPage />} />
            <Route path="/auth/password/reset/confirm/:uid/:token" element={<PasswordResetConfirmPage />} />

            <Route path="*" element={<NotFoundPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/profile/" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
            } />
            <Route path="/profile/change-password/" element={
                <ProtectedRoute>
                  <PasswordChangePage />
                </ProtectedRoute>
            } />
            <Route path="/profile/change-email/" element={
                <ProtectedRoute>
                  <EmailChangePage />
                </ProtectedRoute>
            } />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
