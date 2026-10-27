import { ImageResponse } from "next/og";

export const alt =
  "IntelliHire: AI recruitment software that screens, interviews and leaves the hiring decision to your team";
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
            IntelliHire by SuperMIA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>AI recruitment software that</span>
            <span>screens and interviews.</span>
            <span style={{ color: "#087ef5", display: "flex" }}>
              Your team decides
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
            No candidate is ever rejected by a machine.
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
            "Scorecards that cite the transcript",
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
