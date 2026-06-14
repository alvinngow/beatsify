import { Pause, Play, Radio, Save, Share2, SkipBack, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useSessionStore } from "./state/sessionStore";

const channels = ["Kick", "Snare", "Closed Hat", "Open Hat", "Clap", "Bass"];
const steps = Array.from({ length: 16 }, (_, index) => index);

export function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { collaborators, projectTitle, bpm, toggleStep, pattern } = useSessionStore();

  const activeSteps = useMemo(
    () => channels.reduce((total, channel) => total + pattern[channel].filter(Boolean).length, 0),
    [pattern]
  );

  return (
    <main className="app-shell">
      <aside className="library-panel">
        <div>
          <p className="eyebrow">Beatsify</p>
          <h1>{projectTitle}</h1>
        </div>
        <nav className="sound-list" aria-label="Sound browser">
          {["Drums", "808s", "Keys", "Samples", "Vocals"].map((item) => (
            <button key={item} type="button">
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="studio">
        <header className="topbar">
          <div className="transport">
            <button type="button" aria-label="Return to start">
              <SkipBack size={18} />
            </button>
            <button
              className="primary-control"
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={() => setIsPlaying((value) => !value)}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <span>{bpm} BPM</span>
          </div>
          <div className="session-actions">
            <span className="sync-pill">
              <Radio size={16} />
              Live
            </span>
            <button type="button" aria-label="Save project">
              <Save size={18} />
            </button>
            <button type="button" aria-label="Share session">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <section className="arrangement" aria-label="Beat sequencer">
          <div className="timeline">
            {steps.map((step) => (
              <span key={step}>{step + 1}</span>
            ))}
          </div>
          <div className="sequencer">
            {channels.map((channel) => (
              <div className="track-row" key={channel}>
                <div className="track-label">{channel}</div>
                <div className="step-grid">
                  {steps.map((step) => (
                    <button
                      className={pattern[channel][step] ? "step active" : "step"}
                      key={step}
                      type="button"
                      aria-label={`${channel} step ${step + 1}`}
                      onClick={() => toggleStep(channel, step)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <aside className="collab-panel">
        <div className="panel-heading">
          <Users size={18} />
          <h2>Session</h2>
        </div>
        <dl className="session-stats">
          <div>
            <dt>Active steps</dt>
            <dd>{activeSteps}</dd>
          </div>
          <div>
            <dt>Version</dt>
            <dd>0.1</dd>
          </div>
        </dl>
        <div className="collaborators">
          {collaborators.map((collaborator) => (
            <div className="collaborator" key={collaborator.id}>
              <span style={{ background: collaborator.color }} />
              <p>{collaborator.name}</p>
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}

