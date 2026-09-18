import { ImageResponse } from "next/og";

export const alt =
  "IntelliHire, AI-powered recruitment that finds, evaluates and connects you with the right talent, faster";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#071a3d",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "#087ef5",
            opacity: 0.18,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 3, background: "#ff6b00" }} />
          <div
            style={{
              color: "#ffffff",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            IntelliHire
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 86,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Hire smarter.</span>
            <span style={{ color: "#087ef5", display: "flex" }}>
              Build stronger teams
              <span style={{ color: "#ff6b00" }}>.</span>
            </span>
          </div>

          <div
            style={{
              marginTop: 28,
              color: "rgba(255,255,255,0.7)",
              fontSize: 28,
              lineHeight: 1.45,
              maxWidth: 820,
            }}
          >
            AI-powered recruitment that finds, evaluates and connects you with
            the right talent, faster.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {[
            "AI voice interviews",
            "Candidate matching",
            "Evidence-backed scorecards",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "rgba(255,255,255,0.75)",
                fontSize: 22,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: "#087ef5",
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
