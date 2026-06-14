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
    <main className="grid min-h-screen grid-cols-1 bg-surface text-foreground lg:grid-cols-12">
      <aside className="flex flex-col gap-7 border-line bg-panel/90 p-5 md:flex-row md:items-center md:justify-between lg:col-span-2 lg:flex-col lg:items-stretch lg:justify-start lg:border-r lg:px-6 lg:py-7">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-accent">Beatsify</p>
          <h1 className="text-3xl font-bold leading-none">{projectTitle}</h1>
        </div>
        <nav className="grid gap-2 max-sm:w-full max-sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-1" aria-label="Sound browser">
          {["Drums", "808s", "Keys", "Samples", "Vocals"].map((item) => (
            <button
              className="min-h-10 rounded-lg bg-card px-4 text-left text-inherit transition hover:bg-control"
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="flex min-w-0 flex-col lg:col-span-8">
        <header className="flex min-h-20 items-center justify-between gap-5 border-b border-line p-5 max-sm:flex-col max-sm:items-start lg:px-7">
          <div className="flex items-center gap-3">
            <button
              className="grid size-10 place-items-center rounded-lg bg-control transition hover:bg-control-hover"
              type="button"
              aria-label="Return to start"
            >
              <SkipBack size={18} />
            </button>
            <button
              className="grid size-10 place-items-center rounded-lg bg-accent text-surface transition hover:bg-accent-hover"
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={() => setIsPlaying((value) => !value)}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <span>{bpm} BPM</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 items-center gap-2 rounded-full bg-live px-3 font-bold text-surface">
              <Radio size={16} />
              Live
            </span>
            <button
              className="grid size-10 place-items-center rounded-lg bg-control transition hover:bg-control-hover"
              type="button"
              aria-label="Save project"
            >
              <Save size={18} />
            </button>
            <button
              className="grid size-10 place-items-center rounded-lg bg-control transition hover:bg-control-hover"
              type="button"
              aria-label="Share session"
            >
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <section className="min-w-0 flex-1 overflow-auto p-5 lg:p-7" aria-label="Beat sequencer">
          <div className="mb-3 grid min-w-[900px] grid-cols-[9rem_repeat(16,minmax(2.25rem,1fr))] gap-2 pl-36 text-xs text-muted">
            {steps.map((step) => (
              <span key={step}>{step + 1}</span>
            ))}
          </div>
          <div className="grid min-w-[900px] gap-2.5">
            {channels.map((channel) => (
              <div className="grid grid-cols-[9rem_1fr] items-center gap-2" key={channel}>
                <div className="font-bold text-track">{channel}</div>
                <div className="grid grid-cols-[repeat(16,minmax(2.25rem,1fr))] gap-2">
                  {steps.map((step) => (
                    <button
                      className={[
                        "aspect-square min-h-9 rounded-md border border-line transition hover:border-control-hover",
                        pattern[channel][step] ? "" : step % 4 === 0 ? "bg-control-hover" : "bg-control",
                        pattern[channel][step]
                          ? "border-accent-soft bg-accent shadow-lg shadow-accent/30"
                          : ""
                      ].join(" ")}
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

      <aside className="flex flex-col gap-7 border-line bg-panel/90 p-5 lg:col-span-2 lg:border-l lg:px-6 lg:py-7">
        <div className="flex items-center gap-2.5">
          <Users size={18} />
          <h2 className="text-base font-bold">Session</h2>
        </div>
        <dl className="grid grid-cols-2 gap-2.5">
          <div className="rounded-lg bg-card p-3.5">
            <dt className="text-xs text-muted">Active steps</dt>
            <dd className="mt-1 text-2xl font-extrabold">{activeSteps}</dd>
          </div>
          <div className="rounded-lg bg-card p-3.5">
            <dt className="text-xs text-muted">Version</dt>
            <dd className="mt-1 text-2xl font-extrabold">0.1</dd>
          </div>
        </dl>
        <div className="grid gap-2.5">
          {collaborators.map((collaborator) => (
            <div className="flex items-center gap-2.5" key={collaborator.id}>
              <span className="size-3 rounded-full" style={{ background: collaborator.color }} />
              <p>{collaborator.name}</p>
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}
