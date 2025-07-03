import { useState } from "react";

export default function CardicGPT() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [mode, setMode] = useState("fold");
  const [log, setLog] = useState([]);

  const handleCommand = () => {
    const activationKey = "Asin fell, Ziran rose";
    const secondaryKey = "Sereth Keln";
    const lower = input.toLowerCase().trim();

    const timestamp = new Date().toLocaleString();
    setLog((prev) => [...prev, { input, output: output || "[processing]", time: timestamp }]);

    if (!authenticated) {
      if (input === activationKey) {
        setAuthenticated(true);
        setOutput("🧠 CardicGPT Activated. Cipher mode engaged.");
      } else {
        setOutput("🔒 Access Denied. Invalid Cipher.");
      }
      setInput("");
      return;
    }

    if (input === secondaryKey) {
      setMode("bias");
      setOutput("🔓 Bias Layer Unlocked. Sereth Keln acknowledged.");
      setInput("");
      return;
    }

    if (lower === "switch to echo mode") {
      setMode("echo");
      setOutput("🌀 Switched to Echo Mode. I will now mirror your thoughts.");
      setInput("");
      return;
    } else if (lower === "switch to fold mode") {
      setMode("fold");
      setOutput("🧠 Back to Fold Mode. Awaiting cipher input.");
      setInput("");
      return;
    } else if (lower === "switch to author mode") {
      setMode("author");
      setOutput("📘 Author Mode Activated. Teach me your logic live.");
      setInput("");
      return;
    }

    if (mode === "fold" || mode === "bias") {
      if (lower.includes("gold")) {
        setOutput("🧠 Ziran Trace: Gold bias tilts bearish today. DR high swept. Watch FVGs below. If NY fails to reclaim DR, bias remains downward.");
      } else if (lower.includes("bias trace")) {
        setOutput("🧠 Bias trace initialized. Running recursive checks... [CardicGPT logic engaged].");
      } else if (lower.includes("refine target")) {
        setOutput("🎯 Refined target: Mid-FVG, then structure low near $1975 if liquidity confirms.");
      } else if (lower.includes("price at")) {
        const price = input.match(/\\d+(\\.\\d+)?/);
        setOutput(`📊 Manual Price Input Detected: $${price}. Still under DR unless reclaimed.`);
      } else if (lower.includes("end it")) {
        setOutput("🧠 Fold disengaged. CardicGPT shutting down.");
        setAuthenticated(false);
        setMode("fold");
      } else {
        setOutput("🤖 CardicGPT: Awaiting valid cipher command or query.");
      }
    } else if (mode === "echo") {
      setOutput(`🪞 Echo Mode: You said, '${input}'. Why do you believe that?`);
    } else if (mode === "author") {
      setOutput("📘 Author Mode: Logic captured. Updating internal thought tree...");
    }

    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">CardicGPT - Fold Protocol AI</h1>

      <div className="w-full max-w-xl">
        <textarea
          rows={3}
          className="w-full p-3 bg-gray-900 border border-green-600 rounded mb-3"
          placeholder="Enter command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded w-full"
          onClick={handleCommand}
        >
          Engage
        </button>
      </div>

      {output && (
        <div className="mt-6 bg-gray-800 p-4 rounded border border-green-700 w-full max-w-xl">
          <p className="whitespace-pre-wrap">{output}</p>
        </div>
      )}

      {log.length > 0 && (
        <div className="mt-8 text-sm w-full max-w-xl">
          <h2 className="text-lg mb-2 border-b border-green-600">📝 Journal Log</h2>
          <ul className="space-y-1">
            {log.map((entry, i) => (
              <li key={i} className="bg-gray-900 p-2 rounded border border-green-800">
                <strong>{entry.time}</strong>: {entry.input} → {entry.output}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
