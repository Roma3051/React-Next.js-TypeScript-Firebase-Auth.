
import React from "react";
import { AuthProvider } from "../context/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>My App</title>
        </head>
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
