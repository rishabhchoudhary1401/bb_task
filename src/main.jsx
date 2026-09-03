import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Music2, TimerReset, Trophy, Zap } from 'lucide-react'
import './styles.css'
import './hero-overrides.css'

const reveal = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: .75, ease: [0.16, 1, 0.3, 1] } } }
const Section = ({ id, index, children, className = '' }) => {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: .22, once: false })
  return <section id={id} ref={ref} className={`section ${className}`} data-step={index}>{children}</section>
}

function Progress() {
  const [active, setActive] = useState(1)
  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-step]')]
    const observer = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && setActive(+e.target.dataset.step)), { threshold: .35 })
    sections.forEach(s => observer.observe(s)); return () => observer.disconnect()
  }, [])
  return <aside className="progress"><span className="progress-dot" /><span>{String(active).padStart(2, '0')}</span><i /> <span>07</span></aside>
}

function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => { const move = e => { if (ref.current) ref.current.style.transform = `translate(${e.clientX - 140}px, ${e.clientY - 140}px)` }; window.addEventListener('pointermove', move); return () => window.removeEventListener('pointermove', move) }, [])
  return <div ref={ref} className="cursor-glow" />
}

function Hero() {
  const scrollToArena = () => document.querySelector('#arena').scrollIntoView({ behavior: 'smooth' })
  return <Section id="hero" index="1" className="hero">
    <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" />
    <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: .16 } } }}>
      <motion.p variants={reveal} className="task-credit">TASK BY SLOK SRIVASTAVA</motion.p>
      <motion.p variants={reveal} className="eyebrow">PRAGYAN PRESENTS</motion.p>
      <motion.p variants={reveal} className="festival">CLIQUE <em>&amp;</em> CLUES’26</motion.p>
      <motion.div variants={reveal} className="round">ROUND <span>03</span></motion.div>
      <motion.h1 variants={reveal}><span>BREAKING</span><b>3</b><span>BADS</span></motion.h1>
      <motion.p variants={reveal} className="hero-tagline">3 BADS. <i /> 3 GAMES. <i /> 1 WINNER.</motion.p>
    </motion.div>
    <button className="enter-button" onClick={scrollToArena}>ENTER THE ROUND <ArrowDown size={16}/></button>
    <div className="hero-meta">NIT TRICHY <span>///</span> ROUND 03 <span>///</span> LIVE FORMAT</div>
  </Section>
}

function Arena() {
 return <Section id="arena" index="2" className="arena">
   <motion.div initial="hidden" whileInView="visible" viewport={{ amount: .4, once: true }} variants={{visible:{transition:{staggerChildren:.12}}}} className="arena-intro">
    <motion.p variants={reveal} className="eyebrow">01 — ENTER THE ARENA</motion.p>
    <motion.h2 variants={reveal}>THREE WAYS<br/>TO GO <em>BAD.</em></motion.h2>
    <motion.p variants={reveal} className="lede">Six teams. Three members each.<br/>Three completely different skills.</motion.p>
   </motion.div>
   <div className="rules-strip"><span>01 <b>CHARM</b></span><span>02 <b>RHYTHM</b></span><span>03 <b>REFLEX</b></span><span className="pulse-word">PLAY TO WIN</span></div>
 </Section>
}

function SpeedDating() {
  const [playing, setPlaying] = useState(false), [time, setTime] = useState(60), [ended, setEnded] = useState(false)
  useEffect(() => { if (!playing) return; const tick = setInterval(() => setTime(t => { if (t <= 55) { clearInterval(tick); setPlaying(false); setEnded(true); return 0 } return t - 1 }), 650); return () => clearInterval(tick) }, [playing])
  const start = () => { setTime(60); setEnded(false); setPlaying(true) }
  return <Section id="speed" index="3" className="bad-section speed">
    <div className="bad-number">BAD <b>01</b></div><div className="heart heart-one">♥</div><div className="heart heart-two">♥</div>
    <div className="bad-grid">
      <motion.div initial="hidden" whileInView="visible" viewport={{amount:.35, once:true}} variants={{visible:{transition:{staggerChildren:.1}}}}>
        <motion.p variants={reveal} className="eyebrow">ONE PLAYER / ONE PITCH</motion.p>
        <motion.h2 variants={reveal}>SPEED<br/><em>DATING</em></motion.h2>
        <motion.p variants={reveal} className="statement">60 SECONDS.<br/>MAKE IT COUNT.</motion.p>
        <motion.div variants={reveal} className="who"><span>WHO PLAYS</span><b>01 MEMBER / TEAM</b><span>THE MISSION</span><b>MAKE THE ORGANISERS SMILE.</b></motion.div>
      </motion.div>
      <div className={`timer-stage ${playing ? 'running' : ''} ${ended ? 'ended' : ''}`}>
        <div className="timer-ring"><span>{ended ? 'TIME’S' : String(time).padStart(2,'0')}</span><small>{ended ? 'UP.' : 'SEC'}</small></div>
        <button className="action-button pink" onClick={start}>{playing ? 'PITCH IN PLAY' : 'START THE PITCH'} <ArrowUpRight size={16}/></button>
        <AnimatePresence>{ended && <motion.div initial={{scale:.5, opacity:0}} animate={{scale:1,opacity:1}} className="criteria"><p>SCORE: <b>/10</b></p><span>CREATIVITY</span><span>HUMOUR</span><span>CONFIDENCE</span><span>PRESENTATION</span></motion.div>}</AnimatePresence>
      </div>
    </div>
  </Section>
}

function Waveform() { return <div className="waveform">{Array.from({length: 38}, (_,i) => <i key={i} style={{'--h': `${20 + ((i*29)%70)}%`, '--d': `${(i%7)*.07}s`}} />)}</div> }
function Charades() {
 const [revealSong, setRevealSong] = useState(false)
 return <Section id="charades" index="4" className="bad-section music">
  <div className="bad-number">BAD <b>02</b></div><div className="music-grid-lines" />
  <div className="bad-grid music-layout">
   <motion.div initial="hidden" whileInView="visible" viewport={{amount:.3, once:true}} variants={{visible:{transition:{staggerChildren:.1}}}}>
    <motion.p variants={reveal} className="eyebrow">TWO PLAYERS / ZERO WORDS</motion.p><motion.h2 variants={reveal}>MUSIC<br/>DUMB <em>CHARADES</em></motion.h2><motion.p variants={reveal} className="statement">ACT IT.<br/>DON’T SAY IT.</motion.p>
   </motion.div>
   <div className="music-demo"><Waveform /><div className={`song-card ${revealSong ? 'revealed' : ''}`}><span>{revealSong ? 'MIDNIGHT METRO' : 'TRACK CLASSIFIED'}</span><small>{revealSong ? 'NOW ACT IT.' : 'YOUR SONG IS HIDING.'}</small></div><button onClick={() => setRevealSong(!revealSong)} className="action-button cyan"><Music2 size={16}/>{revealSong ? 'HIDE THE SONG' : 'REVEAL THE SONG'}</button></div>
  </div>
  <div className="timeline"><div><b>00—20</b><span>SEC</span><strong>10 PTS</strong></div><div><b>20—40</b><span>SEC</span><strong>09 PTS</strong></div><div><b>40—60</b><span>SEC</span><strong>08 PTS</strong></div><div><b>LAST 10</b><span>SEC</span><strong>06 PTS</strong></div></div>
 </Section>
}

function Meme() {
 const [buzzed,setBuzzed]=useState(false), [wrong,setWrong]=useState(false)
 const buzz = () => { setBuzzed(true); setWrong(false); setTimeout(()=>setBuzzed(false), 2500) }
 return <Section id="meme" index="5" className={`bad-section meme ${buzzed?'flash':''}`}>
  <div className="bad-number">BAD <b>03</b><small>BONUS</small></div><div className="pixel-noise" />
  <div className="bad-grid meme-layout"><motion.div initial="hidden" whileInView="visible" viewport={{amount:.3,once:true}} variants={{visible:{transition:{staggerChildren:.1}}}}><motion.p variants={reveal} className="eyebrow">EVERY PLAYER / EVERY REFLEX</motion.p><motion.h2 variants={reveal}>COMPLETE<br/>THE <em>MEME</em></motion.h2><motion.p variants={reveal} className="statement">SEE IT.<br/>BUZZ IT.<br/>FINISH IT.</motion.p></motion.div>
   <div className="meme-game"><div className="meme-window"><div className="window-bar"><i/><i/><i/><span>live_meme.exe</span></div><p>WHEN YOU SUBMIT YOUR PI-1 TASK<br/>AT 11:59 PM</p><strong>{buzzed ? 'AND THE WIFI SAYS: “LET’S TALK.”' : '________________________'}</strong></div><button onClick={buzz} className="buzzer"><span>BUZZ</span></button><div className="buzzer-result">{buzzed ? <><b>BUZZED!</b><strong>+5</strong></> : <><button onClick={()=>setWrong(!wrong)}>SIMULATE WRONG</button>{wrong && <b className="wrong">WRONG −5</b>}</>}</div></div>
  </div>
 </Section>
}

function ScoreLab() { const [scores,setScores]=useState([0,0,0]); const total=scores.reduce((a,b)=>a+b,0); return <Section id="score" index="6" className="score-section"><div className="score-head"><p className="eyebrow">06 — THE SCORE LAB</p><h2>DO THE <em>MATH.</em></h2><p>Highest cumulative score wins.</p></div><div className="score-lab"><div className="score-controls">{['BAD 01 / SPEED DATING','BAD 02 / MUSIC DUMB CHARADES','BAD 03 / COMPLETE THE MEME'].map((label,i)=><div className="score-row" key={label}><span>{label}</span><div><button onClick={()=>setScores(s=>s.map((v,j)=>j===i?Math.max(i===2?-50:0,v-1):v))}>−</button><b>{scores[i] >= 0 ? '+' : ''}{scores[i]}</b><button onClick={()=>setScores(s=>s.map((v,j)=>j===i?Math.min(i===2?50:10,v+1):v))}>+</button></div><small>{i===2?'±50':'/10'}</small></div>)}</div><div className="total-panel"><span>TOTAL SCORE</span><strong>{total}</strong><b>MAX 70</b><div className="equation">10 <i>+</i> 10 <i>+</i> 50 <i>=</i> <em>70</em></div></div></div><div className="teams">{Array.from({length:6},(_,i)=><span key={i}>TEAM {String(i+1).padStart(2,'0')}</span>)}</div></Section> }

function Finale() {return <Section id="final" index="7" className="finale"><Trophy size={20}/><motion.div initial="hidden" whileInView="visible" viewport={{amount:.6,once:true}} variants={{visible:{transition:{staggerChildren:.18}}}}><motion.p variants={reveal}>3 BADS.<br/>3 DIFFERENT SKILLS.</motion.p><motion.h2 variants={reveal}>CREATIVITY.<br/>COMMUNICATION.<br/><em>QUICK THINKING.</em></motion.h2><motion.h3 variants={reveal}>ONLY ONE TEAM<br/>TAKES THE WIN.</motion.h3><motion.div variants={reveal} className="final-lockup">CLIQUE &amp; CLUES’26 <span>BREAKING 3 BADS</span></motion.div><motion.small variants={reveal}>END OF ROUND 03</motion.small></motion.div></Section>}

function App(){ const {scrollYProgress}=useScroll(); const scaleX=useSpring(scrollYProgress,{stiffness:100,damping:30}); return <><motion.div className="scroll-line" style={{scaleX}}/><CursorGlow/><Progress/><Hero/><Arena/><SpeedDating/><Charades/><Meme/><ScoreLab/><Finale/></> }
createRoot(document.getElementById('root')).render(<App />)
