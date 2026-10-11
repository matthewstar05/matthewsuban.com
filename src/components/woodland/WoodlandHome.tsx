"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Feather,
  Heart,
  Moon,
  Pause,
  Play,
  Sparkles,
  Wind,
  X,
  Map,
  Compass,
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { Doodle } from "./Doodles";
import { ForestBackdrop } from "./ForestBackdrop";
import { LivingLeaves } from "./LivingLeaves";

const reminders = [
  "you don't have to bloom all at once.",
  "there is still time to grow.",
  "little things count. you count, too.",
  "it's okay to take the scenic route.",
  "some days, simply being here is enough.",
  "keep a little room for wonder.",
  "a quiet moment is still a moment worth keeping.",
  "there's no right way to wander.",
  "you found all nine. the forest is glad you're here.",
];
const paths = [
  {
    href: "/about",
    label: "the treehouse",
    detail: "a little about me",
    kind: "sprout" as const,
    number: "01",
  },
  {
    href: "/projects",
    label: "the workbench",
    detail: "things i'm making",
    kind: "mushroom" as const,
    number: "02",
  },
  {
    href: "/journal",
    label: "the open journal",
    detail: "thoughts & discoveries",
    kind: "book" as const,
    number: "03",
  },
];
const STORAGE_KEY = "matthew-garden-notes-v1";
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeMotion(listener: () => void) {
  const media = window.matchMedia(MOTION_QUERY);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
interface GardenNote {
  id: string;
  name: string;
  message: string;
}
export interface WoodlandHomeProps {
  title: string;
  subtitle: string;
}

export function WoodlandHome({ title, subtitle }: WoodlandHomeProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => true,
  );
  const [motionOverride, setMotion] = useState<boolean | null>(null);
  const motion = motionOverride ?? !reducedMotion;
  const [collected, setCollected] = useState<number[]>([]);
  const [modal, setModal] = useState<"guestbook" | "breathe" | null>(null);
  const [notes, setNotes] = useState<GardenNote[]>([]);
  const [noteStatus, setNoteStatus] = useState("");
  const [breathing, setBreathing] = useState(false);
  const [breathTime, setBreathTime] = useState(0);
  const [calm, setCalm] = useState(false);
  const [gust, setGust] = useState(0);
  const [spirit, setSpirit] = useState(0);
  const [toast, setToast] = useState("Welcome, wanderer. There's no hurry here.");
  const dialog = useRef<HTMLDialogElement>(null);
  const windClockRef = useRef(0);
  function openGuestbook() {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(parsed))
        setNotes(
          parsed
            .filter(
              (note): note is GardenNote =>
                typeof note === "object" &&
                note !== null &&
                typeof note.id === "string" &&
                typeof note.name === "string" &&
                typeof note.message === "string",
            )
            .slice(0, 12),
        );
    } catch {
      /* The garden remains usable without storage. */
    }
    setModal("guestbook");
  }
  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [modal]);
  useEffect(() => {
    if (!breathing || modal !== "breathe") return;
    const timer = window.setInterval(() => setBreathTime((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [breathing, modal]);
  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = String(data.get("message") ?? "")
      .trim()
      .slice(0, 180);
    const name =
      String(data.get("name") ?? "")
        .trim()
        .slice(0, 32) || "a passing friend";
    if (!message) {
      setNoteStatus("Write a little something first.");
      return;
    }
    const next = [{ id: crypto.randomUUID(), name, message }, ...notes].slice(0, 12);
    setNotes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setNoteStatus("Your little note is planted in this browser. Thank you ♡");
    } catch {
      setNoteStatus("Your note is here for this visit. This browser could not save it.");
    }
    event.currentTarget.reset();
  }
  function closeModal() {
    setModal(null);
    setBreathing(false);
    setBreathTime(0);
  }
  function collectLeaf(id: number) {
    if (collected.includes(id)) return;
    setCollected((current) => (current.includes(id) ? current : [...current, id]));
    setToast(collected.length === 8 ? reminders[8] : reminders[id % 8]);
  }
  function shakeBranch() {
    setGust((value) => value + 1);
    setToast("A little breeze, just for you. Try catching a leaf.");
  }

  return (
    <div
      className={`woodland-home forest-home ${motion ? "" : "motion-paused"} ${calm ? "quiet-mode" : ""}`}
      data-woodland-home
    >
      <header className="garden-header">
        <Link className="garden-brand" href="/" aria-label="Matthew's little corner, home">
          <Doodle className="brand-sprout" />
          <span>
            matthew<span className="brand-dot">.</span>
            <small>a small world, quietly growing</small>
          </span>
        </Link>
        <nav aria-label="Main" className="garden-nav">
          <Link href="/" aria-current="page">
            the clearing
          </Link>
          <Link href="/about">about</Link>
          <Link href="/projects">creations</Link>
          <Link href="/journal">journal</Link>
        </nav>
        <div className="garden-header-end">
          <span className="slow-label">
            <span /> a little off the beaten path
          </span>
          <ThemeToggle />
        </div>
      </header>

      <section className="world-scene" aria-label="Explore Matthew's forest">
        <Image
          className="world-art"
          src="/media/forest-coherent-4k.webp"
          alt="A hand-painted anime woodland clearing, with sunlit trees, distant misty mountains, wildflowers, and a winding path"
          fill
          preload
          quality={85}
          sizes="(max-aspect-ratio: 16/9) 178svh, 100vw"
        />
        {motion && !calm && <ForestBackdrop gust={gust} windClockRef={windClockRef} />}
        <div className="world-atmosphere" aria-hidden="true" />
        <div className="world-grain" aria-hidden="true" />
        <div className="world-stars" aria-hidden="true">
          <span>✦</span>
          <span>·</span>
          <span>✧</span>
          <span>·</span>
          <span>✦</span>
        </div>
        <div className="world-location">
          <Compass size={14} />
          <span>
            THE DAYDREAM FOREST<small>chapter 01 · a soft place to land</small>
          </span>
        </div>
        <div className="world-copy">
          <p className="handwritten">oh, hello there, wanderer.</p>
          <h1>
            {title.split("|").map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="world-intro">{subtitle}</p>
          <span className="world-copy-flower" aria-hidden="true">
            ✳
          </span>
        </div>
        <button
          type="button"
          className={`world-branch ${gust ? "is-shaking" : ""}`}
          onClick={shakeBranch}
          aria-label="Gently shake the leafy branch"
        >
          <span key={gust} className="branch-glimmer" aria-hidden="true">
            ✧
          </span>
          <span className="object-tip">
            give the leaves a little nudge <Wind size={12} />
          </span>
        </button>
        <Link
          className="world-object world-treehouse"
          href="/about"
          aria-label="Visit the treehouse: about Matthew"
        >
          <Image loading="eager" src="/art/treehouse.png" width={330} height={370} alt="" />
          <span className="object-label">
            <span>01</span> the treehouse <ArrowUpRight size={12} />
          </span>
          <span className="object-tip">a little about me</span>
        </Link>
        <Link
          className="world-object world-workbench"
          href="/projects"
          aria-label="Explore the workbench: Matthew's creations"
        >
          <Image loading="eager" src="/art/workbench.png" width={230} height={200} alt="" />
          <span className="object-label">
            <span>02</span> the workbench <ArrowUpRight size={12} />
          </span>
          <span className="object-tip">small ideas, taking root</span>
        </Link>
        <Link className="world-object world-journal" href="/journal" aria-label="Read the journal">
          <Image loading="eager" src="/art/journal.png" width={180} height={140} alt="" />
          <span className="object-label">
            <span>03</span> the journal <ArrowUpRight size={12} />
          </span>
          <span className="object-tip">thoughts between the leaves</span>
        </Link>
        <button
          type="button"
          className="world-object world-mailbox"
          onClick={openGuestbook}
          aria-label="Open the mailbox guestbook"
        >
          <Image loading="eager" src="/art/mailbox.png" width={150} height={230} alt="" />
          <span className="object-label">
            <Heart size={10} /> little hellos
          </span>
          <span className="object-tip">leave a note in your private garden</span>
        </button>
        <button
          type="button"
          className="world-object world-pond"
          onClick={() => setModal("breathe")}
          aria-label="Rest by the pond: a breathing break"
        >
          <Image loading="eager" src="/art/pond.png" width={480} height={260} alt="" />
          <span className="pond-ripple" aria-hidden="true" />
          <span className="object-label">
            <Wind size={11} /> a moment to breathe
          </span>
          <span className="object-tip">nothing to do. nowhere to be.</span>
        </button>
        <button
          type="button"
          className={`world-object world-spirit ${spirit ? "is-awake" : ""}`}
          onClick={() => {
            setSpirit((value) => value + 1);
            setToast(reminders[spirit % 8]);
          }}
          aria-label="Say hello to the little forest spirit"
        >
          <Image
            loading="eager"
            key={spirit}
            src="/art/spirit.png"
            width={120}
            height={140}
            alt=""
          />
          <span className="spirit-heart" aria-hidden="true">
            {spirit ? "♡" : "z z"}
          </span>
          <span className="object-tip">a tiny friend. say hello?</span>
        </button>
        {!calm && (
          <LivingLeaves
            windClockRef={windClockRef}
            motion={motion}
            collected={collected}
            gust={gust}
            onCollect={collectLeaf}
          />
        )}
        <div className="world-dialogue" role="status">
          <span className="dialogue-star">✧</span>
          <p key={toast} className="handwritten">
            {toast}
          </p>
        </div>
        <div className="world-hud">
          <button
            type="button"
            className="keepsake-pouch"
            onClick={() =>
              setToast(
                collected.length === 9
                  ? "Every leaf, a little memory. Thank you for wandering with me."
                  : `${collected.length} of 9 leaf keepsakes found. Brush past the leaves, or gently shake a branch.`,
              )
            }
            aria-label={`Leaf keepsakes: ${collected.length} of 9`}
          >
            <Feather size={18} />
            <span>
              little keepsakes<small>{collected.length} / 9 leaves</small>
            </span>
            {collected.length === 9 && <Check size={14} />}
          </button>
          <span className="world-help">move gently. the forest moves with you.</span>
        </div>
        <div className="world-hud-actions">
          <button
            type="button"
            onClick={() => setMotion(!motion)}
            aria-pressed={!motion}
            aria-label={motion ? "Pause the forest motion" : "Resume the forest motion"}
          >
            {motion ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            type="button"
            onClick={() => setCalm(!calm)}
            aria-pressed={calm}
            aria-label={calm ? "Bring back the little wonders" : "Quiet mode"}
          >
            <Moon size={13} />
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("forest-map")
                ?.scrollIntoView({ behavior: motion ? "smooth" : "instant", block: "start" })
            }
            aria-label="Open the forest map"
          >
            <Map size={16} />
          </button>
        </div>
      </section>

      <section id="forest-map" className="forest-map" aria-label="Paths through the forest">
        <div className="forest-map-heading">
          <span className="tiny-label">EVERY PATH LEADS SOMEWHERE GOOD</span>
          <h2>A few places to get a little lost.</h2>
          <p className="handwritten">pick a path. make yourself at home.</p>
        </div>
        <div className="forest-map-paths">
          {paths.map((path) => (
            <Link key={path.href} href={path.href}>
              <Doodle kind={path.kind} />
              <span>
                <strong>{path.label}</strong>
                <small>{path.detail}</small>
              </span>
              <ArrowUpRight size={14} />
            </Link>
          ))}
          <button type="button" onClick={openGuestbook}>
            <Doodle kind="letter" />
            <span>
              <strong>the little mailbox</strong>
              <small>leave a note, keep a moment</small>
            </span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </section>
      <footer className="garden-footer">
        <span>
          an ordinary human, a little imaginary world <Heart size={11} />
        </span>
        <span>
          © Matthew Suban <span className="footer-flower">✳</span>
          <Link href="/contact">
            say hello <ArrowUpRight size={11} />
          </Link>
        </span>
      </footer>

      <dialog
        ref={dialog}
        className={`garden-dialog ${modal === "breathe" ? "breathing-dialog" : ""}`}
        onCancel={closeModal}
        onClose={closeModal}
        onClick={(event) => {
          if (event.target === dialog.current) closeModal();
        }}
        aria-labelledby="dialog-title"
      >
        <div className="dialog-paper">
          <button
            type="button"
            className="dialog-close icon-button"
            aria-label="Close window"
            onClick={closeModal}
          >
            <X size={20} />
          </button>
          {modal === "guestbook" ? (
            <>
              <Doodle kind="letter" className="dialog-doodle" />
              <span className="tiny-label">THE LITTLE GUESTBOOK</span>
              <h2 id="dialog-title">Leave something kind.</h2>
              <p>A hello, a thought, a tiny piece of your day.</p>
              <form onSubmit={saveNote}>
                <label>
                  Your name <span>(if you&apos;d like)</span>
                  <input
                    name="name"
                    maxLength={32}
                    placeholder="a passing friend"
                    autoComplete="nickname"
                  />
                </label>
                <label>
                  Your little note
                  <textarea
                    name="message"
                    required
                    maxLength={180}
                    placeholder="Today, something lovely was..."
                    rows={3}
                  />
                </label>
                <button className="garden-submit" type="submit">
                  plant a little note <Doodle />
                </button>
              </form>
              <p className="storage-note">
                A private little garden: notes stay in this browser, on this device. They
                aren&apos;t sent to Matthew or other visitors.
              </p>
              <p className="note-status" role="status">
                {noteStatus}
              </p>
              {notes.length > 0 && (
                <div className="garden-notes">
                  {notes.map((note) => (
                    <article key={note.id}>
                      <p>{note.message}</p>
                      <span>from {note.name}</span>
                    </article>
                  ))}
                  <button
                    type="button"
                    className="clear-notes"
                    onClick={() => {
                      setNotes([]);
                      try {
                        localStorage.removeItem(STORAGE_KEY);
                        setNoteStatus("A fresh little garden.");
                      } catch {
                        setNoteStatus(
                          "Notes cleared for this visit. Browser storage could not be updated.",
                        );
                      }
                    }}
                  >
                    clear my notes
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Sparkles size={24} />
              <span className="tiny-label">NOTHING TO DO. NOWHERE TO BE.</span>
              <h2 id="dialog-title">A little room to breathe.</h2>
              <p>Let your shoulders soften. Follow the circle, if you&apos;d like.</p>
              <div className={`breathing-orbit ${breathing ? "is-breathing" : ""}`}>
                <span>
                  {breathing
                    ? breathTime % 12 < 4
                      ? "breathe in"
                      : breathTime % 12 < 6
                        ? "hold gently"
                        : "breathe out"
                    : "just be"}
                </span>
              </div>
              <button
                type="button"
                className="garden-submit"
                onClick={() => {
                  setBreathing(!breathing);
                  setBreathTime(0);
                }}
              >
                {breathing ? "pause here" : "take a slow breath"} <Wind size={15} />
              </button>
              <p className="storage-note">In for 4. Hold for 2. Out for 6. At your own pace.</p>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
