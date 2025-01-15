import React, { useState } from 'react';

const WebsiteFormModal = ({ onClose, onSubmit }) => {
    const [websiteName, setWebsiteName] = useState('');
    const [githubAccount, setGithubAccount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ websiteName, githubAccount });
        onClose(); // Close the modal/form after submission
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Website Information</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Website Name:</label>
                        <input 
                            type="text" 
                            value={websiteName} 
                            onChange={(e) => setWebsiteName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>GitHub Account:</label>
                        <input 
                            type="text" 
                            value={githubAccount} 
                            onChange={(e) => setGithubAccount(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default WebsiteFormModal;