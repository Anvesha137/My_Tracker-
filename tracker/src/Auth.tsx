import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

interface AuthProps {
    onLogin: (user: { email: string; name: string }) => void;
}

const T = {
    bg: '#fef8f2',
    card: '#ffffff',
    border: '#f0e4d7',
    text: '#3d2010',
    textSub: '#7a5540',
    textMuted: '#b89880',
    amber: '#c4885a',
    amberBg: '#fdf5ee',
    green: '#5f9e7a',
};

export default function Auth({ onLogin }: AuthProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password || (!isLogin && !name)) {
            setError('Please fill in all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('tracker_users') || '{}');

        if (isLogin) {
            if (users[email] && users[email].password === password) {
                onLogin({ email, name: users[email].name });
            } else {
                setError('Invalid email or password');
            }
        } else {
            if (users[email]) {
                setError('User already exists');
            } else {
                users[email] = { name, password };
                localStorage.setItem('tracker_users', JSON.stringify(users));
                onLogin({ email, name });
            }
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: T.bg, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontFamily: '"DM Sans", system-ui, sans-serif',
            padding: 20
        }}>
            <div style={{ 
                maxWidth: 400, 
                width: '100%', 
                background: T.card, 
                borderRadius: 24, 
                border: `1px solid ${T.border}`, 
                boxShadow: '0 10px 40px rgba(140,80,40,0.08)',
                padding: '40px 32px',
                textAlign: 'center'
            }}>
                <div style={{ 
                    width: 56, 
                    height: 56, 
                    background: T.amberBg, 
                    borderRadius: 16, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 20px',
                    color: T.amber
                }}>
                    <Sparkles size={28} />
                </div>

                <h1 style={{ 
                    fontFamily: '"DM Serif Display", Georgia, serif', 
                    fontSize: 28, 
                    margin: '0 0 8px', 
                    color: T.text 
                }}>
                    {isLogin ? 'Welcome Back' : 'Join the Sprint'}
                </h1>
                <p style={{ color: T.textSub, fontSize: 14, marginBottom: 32 }}>
                    {isLogin ? 'Pick up right where you left off.' : 'Start your own personalized journey today.'}
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {!isLogin && (
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.textMuted }} />
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                    )}
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.textMuted }} />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.textMuted }} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    {error && <p style={{ color: '#c97a7a', fontSize: 12, margin: '4px 0' }}>{error}</p>}

                    <button type="submit" style={{ 
                        background: T.text, 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: 12, 
                        padding: '14px', 
                        fontSize: 15, 
                        fontWeight: 600, 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        marginTop: 8,
                        transition: 'transform 0.2s, background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#523018'}
                    onMouseOut={e => e.currentTarget.style.background = T.text}
                    >
                        {isLogin ? 'Login Now' : 'Create Account'}
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ marginTop: 24, fontSize: 13, color: T.textMuted }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: T.amber, fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#fdf8f4',
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    padding: '12px 14px 12px 42px',
    fontSize: 14,
    color: T.text,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: '"DM Sans", system-ui, sans-serif'
};
