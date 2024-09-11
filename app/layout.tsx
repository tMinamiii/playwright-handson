export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ul>
          <li>
            <a href="/">ホーム</a>
          </li>
          <li>
            <a href="/form">入力フォーム</a>
          </li>
        </ul>
        {children}
      </body>
    </html>
  );
}
