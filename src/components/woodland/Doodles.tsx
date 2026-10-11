export type DoodleKind = "sprout" | "flower" | "mushroom" | "book" | "letter";
export function Doodle({
  kind = "sprout",
  className = "",
}: {
  kind?: DoodleKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {kind === "sprout" && (
        <>
          <path d="M38 68c4-16 3-30 2-44M40 45C18 48 14 31 16 22c20-2 27 9 24 23ZM41 34c-1-18 13-24 26-22 1 13-6 25-26 22Z" />
          <path d="m21 28 18 16m20-25-17 14M26 70c9-4 20-4 30 0" />
        </>
      )}
      {kind === "flower" && (
        <>
          <path d="M40 44v27m0-9c-15 0-20-10-20-10 13-3 20 5 20 10Zm1-7c12 0 18-12 18-12-14-2-18 12-18 12Z" />
          <path d="M33 25c-17-16-1-29 7-12 8-17 24-4 7 12 22-1 18 19 0 15-4 19-22 13-14-3-20 8-26-11-7-14l7 2Z" />
          <circle cx="40" cy="29" r="6" />
        </>
      )}
      {kind === "mushroom" && (
        <>
          <path d="M13 40c0-35 54-35 54 0-16 6-37 6-54 0ZM32 46l-4 23c8 4 17 4 25 0l-5-23" />
          <path d="M22 32c1-7 5-11 10-13m19 9 2 2m-30 9 2 1m18-21 1 1M12 70l-4-8m8 8 3-6m43 6 5-9" />
        </>
      )}
      {kind === "book" && (
        <>
          <path d="m20 15 42 6-4 49-43-6 5-49Z" />
          <path d="m25 16-6 48m11-37 23 3m-24 6 21 3m-22 6 16 2M17 66l-1 5 39 5m-5-54-2 13 5-2 4 3 2-13" />
        </>
      )}
      {kind === "letter" && (
        <>
          <path d="m10 28 55-6 6 39-55 7-6-40Zm1 1 30 20 24-26M18 62l16-17m31 11L48 42" />
          <path d="M41 17c-10-6-2-14 3-7 4-8 14-2 4 6l-3 3-4-2Z" />
        </>
      )}
    </svg>
  );
}
