import type { CSSProperties } from "react";
import styles from "./ProjectThumbnail.module.css";

export type ThumbnailOverlay = {
  src: string;
  alt?: string;
  left: string;
  top: string;
  width: string;
  height: string;
  radius?: string;
  shadow?: boolean;
  hoverTransform?: string;
};

export type ThumbnailData = {
  background: string;
  logo: {
    src: string;
    alt?: string;
    left: string;
    top: string;
    width: string;
    height: string;
    hoverTransform?: string;
  };
  overlays: ThumbnailOverlay[];
};

type CSSVars = CSSProperties & { "--hover-transform"?: string };

export default function ProjectThumbnail({
  data,
  title,
}: {
  data: ThumbnailData;
  title: string;
}) {
  return (
    <div className={styles.thumb} style={{ background: data.background }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.logo.src}
        alt={data.logo.alt ?? `${title} logo`}
        className={styles.logo}
        style={
          {
            left: data.logo.left,
            top: data.logo.top,
            width: data.logo.width,
            height: data.logo.height,
            "--hover-transform": data.logo.hoverTransform ?? "scale(1.06)",
          } as CSSVars
        }
      />
      {data.overlays.map((o, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={o.src}
          alt={o.alt ?? `${title} screenshot ${i + 1}`}
          className={`${styles.overlay} ${o.shadow ? styles.shadow : ""}`}
          style={
            {
              left: o.left,
              top: o.top,
              width: o.width,
              height: o.height,
              borderRadius: o.radius,
              "--hover-transform":
                o.hoverTransform ?? "translateY(-6%) scale(1.06)",
            } as CSSVars
          }
        />
      ))}
    </div>
  );
}
