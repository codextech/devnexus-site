import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "DevNexus";
  const type = searchParams.get("type") || "page"; // blog | case-study | service | page
  const tag = searchParams.get("tag") || "";

  // Type labels
  const typeLabel: Record<string, string> = {
    blog: "Blog",
    "case-study": "Case Study",
    service: "Services",
    page: "DevNexus",
  };

  const label = tag || typeLabel[type] || "DevNexus";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(2,169,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(2,169,247,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Blue glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(2,169,247,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Bottom-left glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(2,169,247,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "64px 72px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top: label badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "rgba(2,169,247,0.12)",
                border: "1px solid rgba(2,169,247,0.3)",
                borderRadius: "8px",
                padding: "6px 16px",
                color: "#02a9f7",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
          </div>

          {/* Middle: title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              flex: 1,
              justifyContent: "center",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            <div
              style={{
                fontSize: title.length > 60 ? "46px" : title.length > 40 ? "54px" : "62px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                maxWidth: "900px",
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom: logo + domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Wordmark text as fallback (SVG can't be inlined in edge runtime easily) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* D mark square */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "linear-gradient(135deg, #02a9f7, #0080cc)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: 900,
                }}
              >
                D
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "26px",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                }}
              >
                DevNexus
              </span>
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "18px",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              devnexus.co
            </div>
          </div>
        </div>

        {/* Right accent line */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "15%",
            bottom: "15%",
            width: "3px",
            background: "linear-gradient(to bottom, transparent, #02a9f7, transparent)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
