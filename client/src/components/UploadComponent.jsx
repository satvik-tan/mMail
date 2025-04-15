import axios from "axios";
import React, { useState, useEffect } from "react";

const UploadComponent = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
      setMessage("");
    } else {
      setCsvFile(null);
      setMessage("Please select a CSV file.");
    }
  };

  const handleUpload = async () => {
    if (!csvFile) {
      setMessage("Please select a CSV file to upload.");
      return;
    }
    
    setIsLoading(true);
    setMessage("Sending emails...");
    
    // Get the email template from localStorage
    let emailTemplate = {
      subject: "Alfresco-2025 Chess Tournament",
      greeting: "Hello",
      body: "♟️ Join Our Chess Community for Match Updates! 🎉\n\nThank you for registering for the upcoming ALFRESCO '25 CHESS tournament!",
      sender: "Satvik"
    };
    
    try {
      const savedTemplate = localStorage.getItem('emailTemplate');
      if (savedTemplate) {
        emailTemplate = JSON.parse(savedTemplate);
      }
    } catch (e) {
      console.error("Error parsing saved template:", e);
    }
    
    const formData = new FormData();
    formData.append("csv", csvFile);
    formData.append("subject", emailTemplate.subject);
    formData.append("greeting", emailTemplate.greeting);
    formData.append("body", emailTemplate.body);
    formData.append("sender", emailTemplate.sender);
    
    try {
      const response = await axios.post("http://localhost:3000/email/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Emails sent successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      setMessage(`Failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <label className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {csvFile ? csvFile.name : "Browse..."}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {!csvFile && "No file selected."}
          </span>
        </div>
        <input 
          type="file" 
          accept=".csv,text/csv" 
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      
      <button 
        className={`w-full mt-4 py-2 px-4 text-white rounded-lg transition-all ${
          isLoading 
            ? "bg-gray-500 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleUpload}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Upload & Send Emails"}
      </button>
      
      {message && (
        <p className={`mt-2 text-sm ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadComponent;