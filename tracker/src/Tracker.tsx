import { useState, useEffect, useMemo } from 'react';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts';
import { Plus, X, Trash2, TrendingUp, ChevronDown, ChevronUp, LogOut, Settings, Edit2 } from 'lucide-react';
import { getPlaceholderTasks } from './dailyTasksData';

// ─── Types ────────────────────────────────────────────────────────────────────
type ReelStatus = 'pending' | 'recording' | 'typography' | 'posted';
interface Reel { id: string; title: string; script: string; status: ReelStatus; }
interface DailyTask { id: string; day: number; text: string; completed: boolean; column: 'morning' | 'work' | 'evening' | 'bed'; }
interface FreelanceIncome { id: string; date: string; amount: number; description: string; }
interface QuickRevertFeature { id: string; name: string; icon: string; completed: boolean; notes: string; }
interface Habit { id: string; name: string; completed: boolean; }
interface TrackerData {
    reels: Reel[];
    dailyTasks: DailyTask[];
    freelanceIncomes: FreelanceIncome[];
    quickRevertFeatures: QuickRevertFeature[];
    habits: Habit[];
    goalAmount: number;
    startDate: string;
    totalDays: number;
}

const DEFAULT_GOAL = 100000;
const DEFAULT_START_DATE = new Date().toISOString().split('T')[0];
const DEFAULT_TOTAL_DAYS = 40;

// ─── Default Content ──────────────────────────────────────────────────────────
const DEFAULT_QR_FEATURES: QuickRevertFeature[] = [
    { id: 'qr1', name: 'Project - feature 1', icon: '🚀', completed: false, notes: '' },
    { id: 'qr2', name: 'Project - feature 2', icon: '✨', completed: false, notes: '' },
    { id: 'qr3', name: 'Project - feature 3', icon: '📂', completed: false, notes: '' },
    { id: 'qr4', name: 'Project - feature 4', icon: '⚡', completed: false, notes: '' },
    { id: 'qr5', name: 'Project - feature 5', icon: '🎴', completed: false, notes: '' },
];

const DEFAULT_HABITS: Habit[] = [
    { id: 'h1', name: '☕ Morning Udemy lesson', completed: false },
    { id: 'h2', name: '💌 3 Upwork proposals', completed: false },
    { id: 'h3', name: '📱 20 Creator DMs', completed: false },
    { id: 'h4', name: '🔗 Post on LinkedIn', completed: false },
    { id: 'h5', name: '📬 Reply all inboxes', completed: false },
    { id: 'h6', name: '💰 Log income', completed: false },
    { id: 'h7', name: '🎬 Film / edit reel', completed: false },
    { id: 'h8', name: '📋 Plan tomorrow', completed: false },
];

const DEFAULT_REELS: Reel[] = Array.from({ length: 12 }, (_, i) => ({
    id: `reel${i + 1}`,
    title: `Reel ${i + 1}`,
    status: 'pending',
    script: 'Enter your script here'
}));

const GET_DEFAULT_DATA = (totalDays: number, goal: number, startDate: string): TrackerData => ({
    reels: DEFAULT_REELS,
    dailyTasks: getPlaceholderTasks(totalDays), 
    freelanceIncomes: [],
    quickRevertFeatures: DEFAULT_QR_FEATURES,
    habits: DEFAULT_HABITS,
    goalAmount: goal,
    startDate: startDate,
    totalDays: totalDays,
});

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
    bg: '#fef8f2',
    card: '#ffffff',
    border: '#f0e4d7',
    shadow: '0 2px 20px rgba(140,80,40,0.07)',
    shadowHover: '0 4px 28px rgba(140,80,40,0.13)',
    text: '#3d2010',
    textSub: '#7a5540',
    textMuted: '#b89880',
    textFaint: '#d8c4b4',
    green: '#5f9e7a',
    greenBg: '#f0f8f4',
    greenTrack: '#ddf0e8',
    rose: '#c97a7a',
    roseBg: '#fdf4f4',
    roseTrack: '#f5dede',
    lavender: '#8b7ec8',
    lavenderBg: '#f5f3fb',
    lavenderTrack: '#e4dff5',
    amber: '#c4885a',
    amberBg: '#fdf5ee',
    amberTrack: '#f5e0cc',
    blue: '#5a8fc4',
};

// ─── Circular Ring ─────────────────────────────────────────────────────────────
function Ring({ value, max, size = 100, stroke = 9, color, trackColor, children }: {
    value: number; max: number; size?: number; stroke?: number;
    color: string; trackColor: string; children?: React.ReactNode;
}) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const pct = Math.min(value / Math.max(max, 1), 1);
    const offset = circ - pct * circ;
    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
                    strokeWidth={stroke} strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {children}
            </div>
        </div>
    );
}

// ─── Custom Chart Tooltips ─────────────────────────────────────────────────────
function RevenueTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#fff', border: `1px solid ${T.border}`, borderRadius: 10, padding: '8px 14px', fontSize: 12, boxShadow: T.shadow }}>
            <p style={{ color: T.textMuted, marginBottom: 4 }}>Day {label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} style={{ color: p.color, margin: '2px 0' }}>
                    {p.name}: ₹{Number(p.value).toLocaleString('en-IN')}
                </p>
            ))}
        </div>
    );
}

function ReelTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#fff', border: `1px solid ${T.border}`, borderRadius: 10, padding: '8px 14px', fontSize: 12, boxShadow: T.shadow }}>
            <p style={{ color: T.text }}>{payload[0]?.payload?.stage}: <b>{payload[0]?.value}</b> reels</p>
        </div>
    );
}

// ─── Shared Card ──────────────────────────────────────────────────────────────
function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, boxShadow: T.shadow, ...style }}>
            {children}
        </div>
    );
}

// ─── Section Label ─────────────────────────────────────────────────────────────
function SectionTitle({ icon, title, badge, color = T.text }: { icon: string; title: string; badge?: string; color?: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 20, color: T.text }}>{title}</span>
            {badge && (
                <span style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 99, padding: '2px 10px', fontSize: 12, color: T.textSub }}>
                    {badge}
                </span>
            )}
        </div>
    );
}

// ─── Input Style ──────────────────────────────────────────────────────────────
const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8,
    color: T.text, padding: '8px 12px', outline: 'none', width: '100%',
    fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 13,
    ...extra,
});

// ─── Main Tracker ─────────────────────────────────────────────────────────────
export default function Tracker({ user, onLogout }: { user: { email: string; name: string }, onLogout: () => void }) {
    const storageKey = `tracker_data_${user.email}`;

    const [data, setData] = useState<TrackerData>(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) return JSON.parse(saved);
        } catch { }
        return GET_DEFAULT_DATA(DEFAULT_TOTAL_DAYS, DEFAULT_GOAL, DEFAULT_START_DATE);
    });

    const goalAmount = data.goalAmount || DEFAULT_GOAL;
    const totalDays = data.totalDays || DEFAULT_TOTAL_DAYS;
    const startDate = new Date(data.startDate || DEFAULT_START_DATE);
    const dailyTarget = Math.ceil(goalAmount / totalDays);

    const today = new Date();
    const daysElapsed = Math.max(1, Math.min(totalDays, Math.floor((today.getTime() - startDate.getTime()) / 86400000) + 1));
    const daysRemaining = Math.max(0, totalDays - daysElapsed);

    const [showRevenueCalc, setShowRevenueCalc] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settingsInput, setSettingsInput] = useState({ 
        goal: goalAmount.toString(), 
        days: totalDays.toString(), 
        date: data.startDate || DEFAULT_START_DATE 
    });

    const [newIncome, setNewIncome] = useState({ date: '', amount: '', description: '' });
    const [editingHabit, setEditingHabit] = useState<string | null>(null);
    const [editingQR, setEditingQR] = useState<string | null>(null);
    const [editingIncome, setEditingIncome] = useState<string | null>(null);
    const [newHabit, setNewHabit] = useState('');
    const [showAddHabit, setShowAddHabit] = useState(false);
    const [newQRName, setNewQRName] = useState('');
    const [showAddQR, setShowAddQR] = useState(false);
    const [expandedReel, setExpandedReel] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState(daysElapsed);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }, [data, storageKey]);

    // ── Derived ──
    const totalEarned = data.freelanceIncomes.reduce((s, i) => s + i.amount, 0);
    const qrDone = data.quickRevertFeatures.filter(f => f.completed).length;
    const qrTotal = data.quickRevertFeatures.length;
    const habitsCompleted = data.habits.filter(h => h.completed).length;
    const reelsPosted = data.reels.filter(r => r.status === 'posted').length;
    const earnedPct = Math.min(100, Math.round((totalEarned / goalAmount) * 100));
    const paceNeeded = daysRemaining > 0 ? Math.ceil((goalAmount - totalEarned) / daysRemaining) : 0;

    const revenueChartData = useMemo(() => (
        Array.from({ length: totalDays }, (_, i) => {
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + i);
            const ds = d.toISOString().split('T')[0];
            return {
                day: i + 1,
                earned: data.freelanceIncomes.filter(inc => inc.date <= ds).reduce((s, inc) => s + inc.amount, 0),
                target: Math.round((i + 1) * dailyTarget),
            };
        })
    ), [data.freelanceIncomes, totalDays, startDate, dailyTarget]);

    const reelsPipeline = [
        { stage: 'Pending', count: data.reels.filter(r => r.status === 'pending').length, color: '#c4c0ba' },
        { stage: 'Recording', count: data.reels.filter(r => r.status === 'recording').length, color: '#e8b56a' },
        { stage: 'Typography', count: data.reels.filter(r => r.status === 'typography').length, color: T.blue },
        { stage: 'Posted', count: data.reels.filter(r => r.status === 'posted').length, color: T.green },
    ];

    // ── Mutations ──
    const addReel = () => {
        const id = Date.now().toString();
        setData(d => ({ ...d, reels: [...d.reels, { id, title: `Reel ${d.reels.length + 1}`, script: '', status: 'pending' }] }));
        setExpandedReel(id);
    };
    const updateReel = (id: string, upd: Partial<Reel>) =>
        setData(d => ({ ...d, reels: d.reels.map(r => r.id === id ? { ...r, ...upd } : r) }));
    const deleteReel = (id: string) => setData(d => ({ ...d, reels: d.reels.filter(r => r.id !== id) }));

    const addTask = (col: DailyTask['column']) => {
        const id = Date.now().toString();
        setData(d => ({ ...d, dailyTasks: [...d.dailyTasks, { id, day: selectedDay, text: '', completed: false, column: col }] }));
    };
    const updateTask = (id: string, upd: Partial<DailyTask>) =>
        setData(d => ({ ...d, dailyTasks: d.dailyTasks.map(t => t.id === id ? { ...t, ...upd } : t) }));
    const deleteTask = (id: string) => setData(d => ({ ...d, dailyTasks: d.dailyTasks.filter(t => t.id !== id) }));

    const addIncome = () => {
        if (!newIncome.amount || !newIncome.date) return;
        setData(d => ({ ...d, freelanceIncomes: [...d.freelanceIncomes, { id: Date.now().toString(), date: newIncome.date, amount: parseFloat(newIncome.amount), description: newIncome.description }] }));
        setNewIncome({ date: '', amount: '', description: '' });
    };

    const addHabit = () => {
        if (!newHabit.trim()) return;
        setData(d => ({ ...d, habits: [...d.habits, { id: Date.now().toString(), name: newHabit.trim(), completed: false }] }));
        setNewHabit(''); setShowAddHabit(false);
    };

    const addQRFeature = () => {
        if (!newQRName.trim()) return;
        setData(d => ({ ...d, quickRevertFeatures: [...d.quickRevertFeatures, { id: Date.now().toString(), name: newQRName.trim(), icon: '✨', completed: false, notes: '' }] }));
        setNewQRName(''); setShowAddQR(false);
    };

    const statusMeta: Record<ReelStatus, { label: string; color: string; bg: string }> = {
        pending: { label: 'Pending', color: '#9e8e80', bg: '#f5f0eb' },
        recording: { label: 'Recording', color: '#c4885a', bg: '#fdf5ee' },
        typography: { label: 'Typography', color: T.blue, bg: '#eef4fb' },
        posted: { label: 'Posted ✓', color: T.green, bg: '#edf8f3' },
    };

    const colMeta: Record<DailyTask['column'], { label: string; emoji: string; color: string; bg: string }> = {
        morning: { label: 'Morning', emoji: '🌅', color: '#c4885a', bg: '#fdf5ee' },
        work: { label: 'Afternoon', emoji: '☀️', color: T.blue, bg: '#eef4fb' },
        evening: { label: 'Evening', emoji: '🌇', color: T.lavender, bg: T.lavenderBg },
        bed: { label: 'Before Bed', emoji: '🌙', color: T.green, bg: T.greenBg },
    };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, fontFamily: '"DM Sans", system-ui, sans-serif', color: T.text }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* ── HEADER ──────────────────────────────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: T.green }} />
                            <span style={{ fontSize: 12, color: T.green, letterSpacing: 2, textTransform: 'uppercase' }}>Live</span>
                            <span style={{ fontSize: 12, color: T.textMuted }}>· {startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} – {new Date(startDate.getTime() + totalDays * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <h1 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 34, margin: 0, color: T.text, lineHeight: 1.1 }}>
                            {totalDays}-Day Sprint 🚀
                        </h1>
                        <p style={{ color: T.textMuted, fontSize: 14, margin: '6px 0 0' }}>
                            Goal: ₹{goalAmount.toLocaleString('en-IN')} · {user.name}'s tracker
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => setShowSettings(!showSettings)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: '10px', color: T.textSub, boxShadow: T.shadow, cursor: 'pointer' }}>
                            <Settings size={20} />
                        </button>
                        <button onClick={onLogout} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: '10px', color: T.rose, boxShadow: T.shadow, cursor: 'pointer' }}>
                            <LogOut size={20} />
                        </button>
                        {[
                            { label: `Day ${daysElapsed}`, sub: `of ${totalDays}`, color: T.lavender },
                            { label: `${daysRemaining}`, sub: 'days left', color: T.amber },
                        ].map(s => (
                            <div key={s.label} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: '10px 20px', textAlign: 'center', boxShadow: T.shadow }}>
                                <div style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1.1 }}>{s.label}</div>
                                <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SETTINGS ─────────────────────────────────────────────── */}
                {showSettings && (
                    <Card style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <SectionTitle icon="⚙️" title="Sprint Settings" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 20 }}>
                            <div>
                                <label style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Goal Amount (₹)</label>
                                <input type="number" value={settingsInput.goal} onChange={e => setSettingsInput(p => ({ ...p, goal: e.target.value }))} style={inp()} />
                            </div>
                            <div>
                                <label style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Total Days</label>
                                <input type="number" value={settingsInput.days} onChange={e => setSettingsInput(p => ({ ...p, days: e.target.value }))} style={inp()} />
                            </div>
                            <div>
                                <label style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Start Date</label>
                                <input type="date" value={settingsInput.date} onChange={e => setSettingsInput(p => ({ ...p, date: e.target.value }))} style={inp()} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button 
                                onClick={() => {
                                    const g = parseInt(settingsInput.goal);
                                    const d = parseInt(settingsInput.days);
                                    if (isNaN(g) || isNaN(d)) return;

                                    setData(prev => ({
                                        ...prev,
                                        goalAmount: g,
                                        totalDays: d,
                                        startDate: settingsInput.date,
                                        // If days increased, we might want to add placeholder tasks
                                        dailyTasks: prev.totalDays < d 
                                            ? [...prev.dailyTasks, ...getPlaceholderTasks(d).filter(t => t.day > prev.totalDays)]
                                            : prev.dailyTasks.filter(t => t.day <= d)
                                    }));
                                    setShowSettings(false);
                                }} 
                                style={{ background: T.green, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
                            >
                                Save Settings
                            </button>
                            <button onClick={() => setShowSettings(false)} style={{ background: T.bg, color: T.textSub, border: `1px solid ${T.border}`, borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 14 }}>
                                Cancel
                            </button>
                        </div>
                    </Card>
                )}

                {/* ── GOAL HERO ─────────────────────────────────────────────── */}
                <Card>
                    <div style={{ padding: '28px 32px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
                            {/* Big ring */}
                            <Ring value={totalEarned} max={goalAmount} size={160} stroke={13} color={T.green} trackColor={T.greenTrack}>
                                <div style={{ fontSize: 26, fontWeight: 700, color: T.green, lineHeight: 1 }}>{earnedPct}%</div>
                                <div style={{ fontSize: 11, color: T.textMuted }}>of goal</div>
                            </Ring>

                            {/* Main stats */}
                            <div style={{ flex: 1, minWidth: 200 }}>
                                <div style={{ fontSize: 12, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>Total Earned</div>
                                <div style={{ fontSize: 42, fontWeight: 700, color: T.green, lineHeight: 1.1, marginTop: 4 }}>
                                    ₹{totalEarned.toLocaleString('en-IN')}
                                </div>
                                <div style={{ fontSize: 15, color: T.textMuted, marginTop: 4 }}>/ ₹{goalAmount.toLocaleString('en-IN')} goal</div>
                                <div style={{ margin: '16px 0 6px', height: 8, background: T.greenTrack, borderRadius: 99, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${earnedPct}%`, background: `linear-gradient(90deg,${T.green},#7ac49a)`, borderRadius: 99, transition: 'width 0.6s' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.textMuted }}>
                                    <span>₹0</span><span>₹{goalAmount.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            {/* Side stats */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[
                                    { label: 'Remaining', val: `₹${(goalAmount - totalEarned).toLocaleString('en-IN')}`, color: T.amber },
                                    { label: 'Pace Needed / Day', val: `₹${paceNeeded.toLocaleString('en-IN')}`, color: T.rose },
                                    { label: 'Original Target / Day', val: `₹${dailyTarget.toLocaleString('en-IN')}`, color: T.textMuted },
                                ].map(s => (
                                    <div key={s.label}>
                                        <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
                                        <div style={{ fontSize: 20, fontWeight: 600, color: s.color }}>{s.val}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ flex: '0 0 100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.textMuted, marginBottom: 6 }}>
                                    <span>{startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                                    <span style={{ color: T.lavender, fontWeight: 600 }}>Day {selectedDay} of {totalDays}</span>
                                    <span>{new Date(startDate.getTime() + totalDays * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
                                    <div style={{ position: 'absolute', height: 10, width: '100%', background: T.lavenderTrack, borderRadius: 99 }} />
                                    <div style={{ position: 'absolute', height: 10, width: `${(selectedDay / totalDays) * 100}%`, background: `linear-gradient(90deg,${T.lavender},#b0a4e0)`, borderRadius: 99, transition: 'width 0.3s' }} />
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max={totalDays} 
                                        value={selectedDay} 
                                        onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                                        style={{ 
                                            position: 'absolute', 
                                            width: '100%', 
                                            height: '100%', 
                                            opacity: 0, 
                                            cursor: 'pointer',
                                            zIndex: 2
                                        }} 
                                    />
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '50%', 
                                        left: `${(selectedDay / totalDays) * 100}%`, 
                                        transform: 'translate(-50%,-50%)', 
                                        width: 18, 
                                        height: 18, 
                                        borderRadius: '50%', 
                                        background: T.lavender, 
                                        border: `3px solid ${T.card}`, 
                                        boxShadow: `0 0 0 2px ${T.lavender}`,
                                        pointerEvents: 'none'
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* ── KPI CARDS ─────────────────────────────────────────────── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 16 }}>
                    {/* Revenue KPI */}
                    <Card>
                        <div style={{ padding: '20px 22px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                <div>
                                    <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>💰 Revenue</div>
                                    <div style={{ fontSize: 28, fontWeight: 700, color: T.green, lineHeight: 1.1, marginTop: 4 }}>₹{totalEarned.toLocaleString('en-IN')}</div>
                                    <div style={{ fontSize: 12, color: T.textMuted }}>/ ₹{goalAmount.toLocaleString('en-IN')}</div>
                                </div>
                                <Ring value={totalEarned} max={goalAmount} size={68} stroke={7} color={T.green} trackColor={T.greenTrack}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: T.green }}>{earnedPct}%</span>
                                </Ring>
                            </div>
                            <button onClick={() => setShowRevenueCalc(s => !s)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.greenBg, border: `1px solid ${T.greenTrack}`, borderRadius: 8, color: T.green, padding: '6px 12px', cursor: 'pointer', fontSize: 12 }}>
                                <TrendingUp size={13} /> {showRevenueCalc ? 'Hide' : 'Open'} Calculator
                                {showRevenueCalc ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                            </button>
                        </div>
                    </Card>

                    {/* QR Features KPI */}
                    <Card>
                        <div style={{ padding: '20px 22px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                <div>
                                    <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>⚡ Project Features</div>
                                    <div style={{ fontSize: 28, fontWeight: 700, color: T.amber, lineHeight: 1.1, marginTop: 4 }}>
                                        {qrDone}<span style={{ fontSize: 16, color: T.textMuted }}>/{qrTotal}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: T.textMuted }}>shipped</div>
                                </div>
                                <Ring value={qrDone} max={qrTotal} size={68} stroke={7} color={T.amber} trackColor={T.amberTrack}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: T.amber }}>{Math.round((qrDone / Math.max(qrTotal, 1)) * 100)}%</span>
                                </Ring>
                            </div>
                            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                                {data.quickRevertFeatures.map((f, i) => (
                                    <div key={f.id} onClick={() => setData(d => ({ ...d, quickRevertFeatures: d.quickRevertFeatures.map(qf => qf.id === f.id ? { ...qf, completed: !qf.completed } : qf) }))} style={{ width: 26, height: 26, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer', background: f.completed ? T.amberBg : T.bg, border: `1.5px solid ${f.completed ? T.amber : T.border}`, color: f.completed ? T.amber : T.textMuted, transition: 'all 0.2s' }}>
                                        {f.completed ? '✓' : i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Habits KPI */}
                    <Card>
                        <div style={{ padding: '20px 22px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                <div>
                                    <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>🧘 Habits Today</div>
                                    <div style={{ fontSize: 28, fontWeight: 700, color: T.rose, lineHeight: 1.1, marginTop: 4 }}>
                                        {habitsCompleted}<span style={{ fontSize: 16, color: T.textMuted }}>/{data.habits.length}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: T.textMuted }}>completed</div>
                                </div>
                                <Ring value={habitsCompleted} max={data.habits.length} size={68} stroke={7} color={T.rose} trackColor={T.roseTrack}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: T.rose }}>{Math.round((habitsCompleted / Math.max(data.habits.length, 1)) * 100)}%</span>
                                </Ring>
                            </div>
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                {data.habits.map(h => (
                                    <div key={h.id} onClick={() => setData(d => ({ ...d, habits: d.habits.map(hab => hab.id === h.id ? { ...hab, completed: !hab.completed } : hab) }))} style={{ width: 26, height: 26, borderRadius: 6, cursor: 'pointer', background: h.completed ? T.roseBg : T.bg, border: `1.5px solid ${h.completed ? T.rose : T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                        {h.completed && <span style={{ fontSize: 11, color: T.rose }}>✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Reels KPI */}
                    <Card>
                        <div style={{ padding: '20px 22px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                <div>
                                    <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>🎬 Reels Posted</div>
                                    <div style={{ fontSize: 28, fontWeight: 700, color: T.lavender, lineHeight: 1.1, marginTop: 4 }}>
                                        {reelsPosted}<span style={{ fontSize: 16, color: T.textMuted }}>/{data.reels.length}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: T.textMuted }}>posted</div>
                                </div>
                                <Ring value={reelsPosted} max={Math.max(data.reels.length, 1)} size={68} stroke={7} color={T.lavender} trackColor={T.lavenderTrack}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: T.lavender }}>{Math.round((reelsPosted / Math.max(data.reels.length, 1)) * 100)}%</span>
                                </Ring>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {reelsPipeline.map(p => (
                                    <div key={p.stage} style={{ flex: 1, textAlign: 'center', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: '5px 4px' }}>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: p.color }}>{p.count}</div>
                                        <div style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase' }}>{p.stage.slice(0, 3)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── REVENUE CALCULATOR ───────────────────────────────────── */}
                {showRevenueCalc && (
                    <Card>
                        <div style={{ padding: '28px 30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <SectionTitle icon="📈" title="Revenue Calculator" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10, marginBottom: 20 }}>
                                <input type="date" value={newIncome.date} onChange={e => setNewIncome(p => ({ ...p, date: e.target.value }))} style={inp()} />
                                <input type="number" placeholder="Amount (₹)" value={newIncome.amount} onChange={e => setNewIncome(p => ({ ...p, amount: e.target.value }))} style={inp()} />
                                <input type="text" placeholder="Description" value={newIncome.description} onChange={e => setNewIncome(p => ({ ...p, description: e.target.value }))} style={inp()} />
                                <button onClick={addIncome} style={{ background: T.green, border: 'none', borderRadius: 8, color: '#fff', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', fontSize: 13 }}>
                                    <Plus size={14} /> Add Income
                                </button>
                            </div>

                            {data.freelanceIncomes.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
                                    {data.freelanceIncomes.map(inc => (
                                        <div key={inc.id} style={{ display: 'flex', alignItems: 'center', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10, padding: '10px 16px', gap: 12 }}>
                                            <div style={{ flex: 1 }}>
                                                {editingIncome === inc.id ? (
                                                    <input autoFocus value={inc.description} onChange={e => setData(d => ({ ...d, freelanceIncomes: d.freelanceIncomes.map(i => i.id === inc.id ? { ...i, description: e.target.value } : i) }))} onBlur={() => setEditingIncome(null)} onKeyDown={e => e.key === 'Enter' && setEditingIncome(null)} style={inp({ flex: '1', fontSize: 13, padding: '3px 8px' })} />
                                                ) : (
                                                    <div onClick={() => setEditingIncome(inc.id)} style={{ fontSize: 13, color: T.text, cursor: 'text' }}>{inc.description || 'Freelance Income'}</div>
                                                )}
                                                <div style={{ fontSize: 11, color: T.textMuted }}>{new Date(inc.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                            </div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: T.green }}>₹{inc.amount.toLocaleString('en-IN')}</div>
                                            <button onClick={() => setData(d => ({ ...d, freelanceIncomes: d.freelanceIncomes.filter(i => i.id !== inc.id) }))} style={{ background: 'none', border: 'none', color: T.rose, cursor: 'pointer', padding: 4 }}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Revenue Chart */}
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Cumulative Earnings vs Target Pace</div>
                                <ResponsiveContainer width="100%" height={220}>
                                    <AreaChart data={revenueChartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="earnedG" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={T.green} stopOpacity={0.2} />
                                                <stop offset="95%" stopColor={T.green} stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="targetG" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={T.amber} stopOpacity={0.12} />
                                                <stop offset="95%" stopColor={T.amber} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid stroke={T.border} strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="day" stroke={T.border} tick={{ fill: T.textMuted, fontSize: 11 }} tickLine={false} />
                                        <YAxis stroke={T.border} tick={{ fill: T.textMuted, fontSize: 11 }} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} width={46} />
                                        <Tooltip content={<RevenueTooltip />} />
                                        <Area type="monotone" dataKey="target" name="Target" stroke={T.amber} strokeWidth={1.5} strokeDasharray="4 3" fill="url(#targetG)" dot={false} />
                                        <Area type="monotone" dataKey="earned" name="Earned" stroke={T.green} strokeWidth={2.5} fill="url(#earnedG)" dot={false} activeDot={{ r: 5, fill: T.green }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                                    { [
                                        { label: 'Total Earned', val: `₹${totalEarned.toLocaleString('en-IN')}`, color: T.green, bg: T.greenBg },
                                        { label: 'Remaining', val: `₹${(goalAmount - totalEarned).toLocaleString('en-IN')}`, color: T.amber, bg: T.amberBg },
                                        { label: 'Needed / Day', val: `₹${paceNeeded.toLocaleString('en-IN')}`, color: T.rose, bg: T.roseBg },
                                    ].map(s => (
                                        <div key={s.label} style={{ background: s.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: '14px 16px' }}>
                                            <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
                                            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </Card>
                )}

                {/* ── DAILY WORK TRACKER ───────────────────────────────────── */}
                <Card>
                    <div style={{ padding: '28px 30px' }}>
                        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                            <SectionTitle icon="📅" title="Daily Work" />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', paddingBottom: 4, maxWidth: '100%' }}>
                                {Array.from({ length: totalDays }, (_, i) => i + 1).map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setSelectedDay(d)}
                                        style={{
                                            padding: '4px 12px',
                                            borderRadius: 8,
                                            border: `1px solid ${selectedDay === d ? T.blue : T.border}`,
                                            background: selectedDay === d ? T.blue : T.card,
                                            color: selectedDay === d ? '#fff' : T.textSub,
                                            fontSize: 12,
                                            fontWeight: selectedDay === d ? 600 : 400,
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Day {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
                            {(['morning', 'work', 'evening', 'bed'] as const).map(col => {
                                const m = colMeta[col];
                                const tasks = data.dailyTasks.filter(t => t.column === col && t.day === selectedDay);
                                const done = tasks.filter(t => t.completed).length;
                                return (
                                    <div key={col} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden' }}>
                                        {/* Column header */}
                                        <div style={{ padding: '12px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: m.bg }}>
                                            <div>
                                                <div style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{m.emoji} {m.label}</div>
                                                <div style={{ fontSize: 11, color: T.textMuted }}>{done}/{tasks.length} done</div>
                                            </div>
                                            <button onClick={() => addTask(col)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, color: m.color, padding: '4px 8px', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        {/* Tasks */}
                                        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 7, minHeight: 80 }}>
                                            {tasks.map(task => (
                                                <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                                    <button onClick={() => updateTask(task.id, { completed: !task.completed })} style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${task.completed ? m.color : T.border}`, background: task.completed ? m.color : 'transparent', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                                                        {task.completed && <span style={{ fontSize: 9, color: '#fff' }}>✓</span>}
                                                    </button>
                                                    <input value={task.text} onChange={e => updateTask(task.id, { text: e.target.value })} placeholder="Task..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: task.completed ? T.textMuted : T.textSub, fontSize: 12, textDecoration: task.completed ? 'line-through' : 'none', fontFamily: '"DM Sans", system-ui, sans-serif', lineHeight: 1.5 }} />
                                                    <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: T.textFaint, cursor: 'pointer', padding: 1, flexShrink: 0 }}>
                                                        <X size={11} />
                                                    </button>
                                                </div>
                                            ))}
                                            {tasks.length === 0 && (
                                                <div style={{ color: T.textFaint, fontSize: 12, textAlign: 'center', paddingTop: 12 }}>Empty</div>
                                            )}
                                        </div>
                                        {/* Bottom progress */}
                                        {tasks.length > 0 && (
                                            <div style={{ height: 3, background: T.border }}>
                                                <div style={{ height: '100%', width: `${(done / tasks.length) * 100}%`, background: m.color, transition: 'width 0.3s' }} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>

                {/* ── TWO COLUMN: QR FEATURES + HABITS ──────────────────────── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
                    {/* QuickRevert Features */}
                    <Card>
                        <div style={{ padding: '24px 26px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                                <SectionTitle icon="⚡" title="Project Features" badge={`${qrDone}/${qrTotal}`} />
                                <button onClick={() => setShowAddQR(s => !s)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: T.amberBg, border: `1px solid ${T.amberTrack}`, borderRadius: 8, color: T.amber, padding: '6px 12px', cursor: 'pointer', fontSize: 12 }}>
                                    <Plus size={13} /> Add
                                </button>
                            </div>

                            <div style={{ height: 4, background: T.amberTrack, borderRadius: 99, marginBottom: 18, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${(qrDone / Math.max(qrTotal, 1)) * 100}%`, background: `linear-gradient(90deg,${T.amber},#e0a878)`, borderRadius: 99, transition: 'width 0.5s' }} />
                            </div>

                            {showAddQR && (
                                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                                    <input value={newQRName} onChange={e => setNewQRName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addQRFeature()} placeholder="Feature name..." autoFocus style={inp({ flex: '1' })} />
                                    <button onClick={addQRFeature} style={{ background: T.amber, border: 'none', borderRadius: 8, color: '#fff', padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>Add</button>
                                    <button onClick={() => setShowAddQR(false)} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMuted, padding: '8px 10px', cursor: 'pointer' }}><X size={14} /></button>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {data.quickRevertFeatures.map(f => (
                                    <div key={f.id} style={{ background: f.completed ? T.amberBg : T.bg, border: `1px solid ${f.completed ? T.amberTrack : T.border}`, borderLeft: `3px solid ${f.completed ? T.amber : T.border}`, borderRadius: 12, padding: '12px 14px', transition: 'all 0.2s' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                            <button onClick={() => setData(d => ({ ...d, quickRevertFeatures: d.quickRevertFeatures.map(qf => qf.id === f.id ? { ...qf, completed: !qf.completed } : qf) }))} style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${f.completed ? T.amber : T.border}`, background: f.completed ? T.amber : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {f.completed && <span style={{ fontSize: 11, color: '#fff' }}>✓</span>}
                                            </button>
                                            <span style={{ fontSize: 16 }}>{f.icon}</span>
                                            {editingQR === f.id ? (
                                                <input autoFocus value={f.name} onChange={e => setData(d => ({ ...d, quickRevertFeatures: d.quickRevertFeatures.map(qf => qf.id === f.id ? { ...qf, name: e.target.value } : qf) }))} onBlur={() => setEditingQR(null)} onKeyDown={e => e.key === 'Enter' && setEditingQR(null)} style={inp({ flex: '1', fontSize: 13, padding: '3px 8px' })} />
                                            ) : (
                                                <span onClick={() => setEditingQR(f.id)} style={{ flex: 1, fontSize: 14, color: f.completed ? T.textMuted : T.text, textDecoration: f.completed ? 'line-through' : 'none', cursor: 'text' }}>{f.name}</span>
                                            )}
                                            <button onClick={() => setData(d => ({ ...d, quickRevertFeatures: d.quickRevertFeatures.filter(qf => qf.id !== f.id) }))} style={{ background: 'none', border: 'none', color: T.textFaint, cursor: 'pointer', padding: 2, flexShrink: 0 }}>
                                                <X size={13} />
                                            </button>
                                        </div>
                                        <textarea value={f.notes} onChange={e => setData(d => ({ ...d, quickRevertFeatures: d.quickRevertFeatures.map(qf => qf.id === f.id ? { ...qf, notes: e.target.value } : qf) }))} placeholder="Add notes..." rows={1} style={{ ...inp(), resize: 'none', fontSize: 12, color: T.textSub }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Habits */}
                    <Card>
                        <div style={{ padding: '24px 26px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                                <SectionTitle icon="🧘" title="Habits Today" badge={`${habitsCompleted}/${data.habits.length}`} />
                                <button onClick={() => setShowAddHabit(s => !s)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: T.roseBg, border: `1px solid ${T.roseTrack}`, borderRadius: 8, color: T.rose, padding: '6px 12px', cursor: 'pointer', fontSize: 12 }}>
                                    <Plus size={13} /> Add
                                </button>
                            </div>

                            <div style={{ height: 4, background: T.roseTrack, borderRadius: 99, marginBottom: 18, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${(habitsCompleted / Math.max(data.habits.length, 1)) * 100}%`, background: `linear-gradient(90deg,${T.rose},#e09a9a)`, borderRadius: 99, transition: 'width 0.5s' }} />
                            </div>

                            {showAddHabit && (
                                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                                    <input value={newHabit} onChange={e => setNewHabit(e.target.value)} onKeyDown={e => e.key === 'Enter' && addHabit()} placeholder="Habit name..." autoFocus style={inp({ flex: '1' })} />
                                    <button onClick={addHabit} style={{ background: T.rose, border: 'none', borderRadius: 8, color: '#fff', padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>Add</button>
                                    <button onClick={() => setShowAddHabit(false)} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMuted, padding: '8px 10px', cursor: 'pointer' }}><X size={14} /></button>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {data.habits.map(h => (
                                    <div key={h.id} onClick={() => setData(d => ({ ...d, habits: d.habits.map(hab => hab.id === h.id ? { ...hab, completed: !hab.completed } : hab) }))} style={{ display: 'flex', alignItems: 'center', gap: 10, background: h.completed ? T.roseBg : T.bg, border: `1px solid ${h.completed ? T.roseTrack : T.border}`, borderLeft: `3px solid ${h.completed ? T.rose : T.border}`, borderRadius: 10, padding: '10px 14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <div style={{ width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${h.completed ? T.rose : T.border}`, background: h.completed ? T.rose : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {h.completed && <span style={{ fontSize: 10, color: '#fff' }}>✓</span>}
                                        </div>
                                        {editingHabit === h.id ? (
                                            <input autoFocus value={h.name} onChange={e => setData(d => ({ ...d, habits: d.habits.map(hab => hab.id === h.id ? { ...hab, name: e.target.value } : hab) }))} onBlur={() => setEditingHabit(null)} onKeyDown={e => e.key === 'Enter' && setEditingHabit(null)} onClick={e => e.stopPropagation()} style={inp({ flex: '1', fontSize: 13, padding: '3px 8px' })} />
                                        ) : (
                                            <span onClick={() => setEditingHabit(h.id)} style={{ flex: 1, fontSize: 13, color: h.completed ? T.textMuted : T.text, textDecoration: h.completed ? 'line-through' : 'none', cursor: 'text' }}>{h.name}</span>
                                        )}
                                        <button onClick={e => { e.stopPropagation(); setEditingHabit(h.id); }} style={{ background: 'none', border: 'none', color: T.textFaint, cursor: 'pointer', padding: 2 }}>
                                            <Edit2 size={12} />
                                        </button>
                                        <button onClick={e => { e.stopPropagation(); setData(d => ({ ...d, habits: d.habits.filter(hab => hab.id !== h.id) })); }} style={{ background: 'none', border: 'none', color: T.textFaint, cursor: 'pointer', padding: 2 }}>
                                            <X size={13} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── REELS TRACKER ────────────────────────────────────────── */}
                <Card>
                    <div style={{ padding: '28px 30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                            <SectionTitle icon="🎬" title="Reels Tracker" badge={`${data.reels.length} reels`} />
                            <button onClick={addReel} style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.lavender, border: 'none', borderRadius: 10, color: '#fff', padding: '9px 18px', cursor: 'pointer', fontSize: 13 }}>
                                <Plus size={14} /> Add Reel
                            </button>
                        </div>

                        {/* Pipeline summary */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
                            {reelsPipeline.map(p => (
                                <div key={p.stage} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                                    <div style={{ fontSize: 24, fontWeight: 700, color: p.color }}>{p.count}</div>
                                    <div style={{ fontSize: 11, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{p.stage}</div>
                                </div>
                            ))}
                        </div>

                        {/* Pipeline bar chart */}
                        {data.reels.length > 0 && (
                            <div style={{ marginBottom: 24 }}>
                                <ResponsiveContainer width="100%" height={60}>
                                    <BarChart data={reelsPipeline} layout="vertical" margin={{ top: 0, right: 10, left: 90, bottom: 0 }}>
                                        <XAxis type="number" hide domain={[0, Math.max(...reelsPipeline.map(p => p.count), 1)]} />
                                        <YAxis type="category" dataKey="stage" tick={{ fill: T.textSub, fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                                        <Tooltip content={<ReelTooltip />} cursor={{ fill: T.bg }} />
                                        <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={12}>
                                            {reelsPipeline.map((p, i) => <Cell key={i} fill={p.color} fillOpacity={0.8} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {/* Reel cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {data.reels.map((reel, index) => {
                                const isExpanded = expandedReel === reel.id;
                                return (
                                    <div key={reel.id} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
                                        {/* Header row */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                                            <span style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, padding: '3px 10px', fontSize: 12, color: T.textMuted, fontWeight: 600, flexShrink: 0 }}>
                                                #{index + 1}
                                            </span>
                                            <input value={reel.title} onChange={e => updateReel(reel.id, { title: e.target.value })} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: T.text, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
                                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                                {(['pending', 'recording', 'typography', 'posted'] as ReelStatus[]).map(s => {
                                                    const m = statusMeta[s];
                                                    return (
                                                        <button key={s} onClick={() => updateReel(reel.id, { status: s })} style={{ padding: '4px 10px', borderRadius: 99, border: `1.5px solid ${reel.status === s ? m.color : T.border}`, background: reel.status === s ? m.bg : 'transparent', color: reel.status === s ? m.color : T.textMuted, cursor: 'pointer', fontSize: 11, transition: 'all 0.2s' }}>
                                                            {m.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <button onClick={() => setExpandedReel(isExpanded ? null : reel.id)} style={{ background: 'none', border: 'none', color: T.textMuted, cursor: 'pointer', padding: 4 }}>
                                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </button>
                                            <button onClick={() => deleteReel(reel.id)} style={{ background: 'none', border: 'none', color: T.roseTrack, cursor: 'pointer', padding: 4 }}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        {/* Expandable script */}
                                        {isExpanded && (
                                            <div style={{ padding: '0 16px 16px' }}>
                                                <textarea value={reel.script} onChange={e => updateReel(reel.id, { script: e.target.value })} placeholder="Reel script..." rows={8} style={{ ...inp(), resize: 'vertical', fontSize: 13, lineHeight: 1.6, color: T.textSub }} />
                                            </div>
                                        )}
                                        {/* Collapsed script preview */}
                                        {!isExpanded && reel.script && (
                                            <div style={{ padding: '0 16px 12px' }}>
                                                <p style={{ fontSize: 12, color: T.textMuted, margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{reel.script.split('\n')[0]}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>


                {/* Footer */}
                <div style={{ textAlign: 'center', color: T.textFaint, fontSize: 12, paddingBottom: 16 }}>
                    Saved to localStorage · {totalDays}-Day Sprint · {startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} – {new Date(startDate.getTime() + totalDays * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} ✨
                </div>
            </div>
        </div>
    );
}
