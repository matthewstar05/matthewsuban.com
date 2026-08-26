export const metadata = {
  title: "Matthew Suban",
  description: "matthewsuban.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
