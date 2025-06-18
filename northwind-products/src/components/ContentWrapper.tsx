export const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      width: "100%",
      flex: 1,
    }}
  >
    {children}
  </div>
);
