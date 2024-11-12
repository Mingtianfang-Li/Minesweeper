import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/game/easy" element={<Game rows={8} cols={8} mines={10} />} />
                <Route path="/game/medium" element={<Game rows={16} cols={16} mines={40} />} />
                <Route path="/game/hard" element={<Game rows={24} cols={24} mines={99} />} />
            </Routes>
        </Router>
    );
}

export default App;
