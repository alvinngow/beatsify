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
    <main className="grid min-h-screen grid-cols-1 bg-[#111317] bg-[linear-gradient(135deg,rgba(40,215,164,0.09),transparent_32%),linear-gradient(315deg,rgba(255,191,71,0.1),transparent_36%)] text-[#edf2f4] lg:grid-cols-[240px_minmax(0,1fr)_280px]">
      <aside className="flex flex-col gap-7 border-white/10 bg-[#111317]/85 p-[18px] lg:border-r lg:p-[28px_22px] md:flex-row md:items-center md:justify-between lg:flex-col lg:items-stretch lg:justify-start">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-[#28d7a4]">Beatsify</p>
          <h1 className="text-[1.9rem] font-bold leading-[1.05]">{projectTitle}</h1>
        </div>
        <nav className="grid gap-2 max-sm:w-full max-sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-1" aria-label="Sound browser">
          {["Drums", "808s", "Keys", "Samples", "Vocals"].map((item) => (
            <button
              className="min-h-[42px] rounded-lg bg-white/[0.06] px-3.5 text-left text-inherit transition hover:bg-white/10"
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="grid min-w-0 grid-rows-[auto_1fr]">
        <header className="flex min-h-[84px] items-center justify-between gap-5 border-b border-white/10 p-[18px] max-sm:flex-col max-sm:items-start lg:p-[18px_28px]">
          <div className="flex items-center gap-3">
            <button
              className="grid size-[42px] place-items-center rounded-lg bg-white/[0.08] transition hover:bg-white/[0.12]"
              type="button"
              aria-label="Return to start"
            >
              <SkipBack size={18} />
            </button>
            <button
              className="grid size-[42px] place-items-center rounded-lg bg-[#28d7a4] text-[#101416] transition hover:bg-[#59e3bc]"
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={() => setIsPlaying((value) => !value)}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <span>{bpm} BPM</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-[34px] items-center gap-2 rounded-full bg-[#ffbf47] px-3 font-bold text-[#101416]">
              <Radio size={16} />
              Live
            </span>
            <button
              className="grid size-[42px] place-items-center rounded-lg bg-white/[0.08] transition hover:bg-white/[0.12]"
              type="button"
              aria-label="Save project"
            >
              <Save size={18} />
            </button>
            <button
              className="grid size-[42px] place-items-center rounded-lg bg-white/[0.08] transition hover:bg-white/[0.12]"
              type="button"
              aria-label="Share session"
            >
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <section className="min-w-0 overflow-auto p-5 lg:p-[30px_28px]" aria-label="Beat sequencer">
          <div className="mb-2.5 grid min-w-[900px] grid-cols-[150px_repeat(16,minmax(36px,1fr))] gap-2 pl-[158px] text-xs text-[#9ca8ad]">
            {steps.map((step) => (
              <span key={step}>{step + 1}</span>
            ))}
          </div>
          <div className="grid min-w-[900px] gap-2.5">
            {channels.map((channel) => (
              <div className="grid grid-cols-[150px_1fr] items-center gap-2" key={channel}>
                <div className="font-bold text-[#d9e3e7]">{channel}</div>
                <div className="grid grid-cols-[repeat(16,minmax(36px,1fr))] gap-2">
                  {steps.map((step) => (
                    <button
                      className={[
                        "aspect-square min-h-9 rounded-md border border-white/10 bg-white/[0.09] transition hover:border-white/20",
                        step % 4 === 0 ? "bg-white/15" : "",
                        pattern[channel][step]
                          ? "border-[#90f1d4] bg-[#28d7a4] shadow-[0_0_20px_rgba(40,215,164,0.28)]"
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

      <aside className="flex flex-col gap-7 border-white/10 bg-[#111317]/85 p-[18px] lg:border-l lg:p-[28px_22px]">
        <div className="flex items-center gap-2.5">
          <Users size={18} />
          <h2 className="text-base font-bold">Session</h2>
        </div>
        <dl className="grid grid-cols-2 gap-2.5">
          <div className="rounded-lg bg-white/[0.06] p-3.5">
            <dt className="text-xs text-[#9ca8ad]">Active steps</dt>
            <dd className="mt-1 text-[1.35rem] font-extrabold">{activeSteps}</dd>
          </div>
          <div className="rounded-lg bg-white/[0.06] p-3.5">
            <dt className="text-xs text-[#9ca8ad]">Version</dt>
            <dd className="mt-1 text-[1.35rem] font-extrabold">0.1</dd>
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
