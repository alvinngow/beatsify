import { create } from "zustand";

type Pattern = Record<string, boolean[]>;

type Collaborator = {
  id: string;
  name: string;
  color: string;
};

type SessionState = {
  bpm: number;
  projectTitle: string;
  collaborators: Collaborator[];
  pattern: Pattern;
  toggleStep: (channel: string, step: number) => void;
};

const initialChannels = ["Kick", "Snare", "Closed Hat", "Open Hat", "Clap", "Bass"];

const createInitialPattern = () =>
  Object.fromEntries(
    initialChannels.map((channel) => [
      channel,
      Array.from({ length: 16 }, (_, step) =>
        channel === "Kick" ? step % 4 === 0 : channel === "Snare" ? step === 4 || step === 12 : false
      )
    ])
  );

export const useSessionStore = create<SessionState>((set) => ({
  bpm: 142,
  projectTitle: "Midnight Bounce",
  collaborators: [
    { id: "1", name: "Ari", color: "#28d7a4" },
    { id: "2", name: "Mika", color: "#ffbf47" }
  ],
  pattern: createInitialPattern(),
  toggleStep: (channel, step) =>
    set((state) => ({
      pattern: {
        ...state.pattern,
        [channel]: state.pattern[channel].map((active, index) => (index === step ? !active : active))
      }
    }))
}));

