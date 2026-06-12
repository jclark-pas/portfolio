import type { CSSProperties } from "react";
import Image from "next/image";
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
      <span
        className={styles.box}
        style={
          {
            left: data.logo.left,
            top: data.logo.top,
            width: data.logo.width,
            height: data.logo.height,
            "--hover-transform": data.logo.hoverTransform ?? "scale(1.06)",
          } as CSSVars
        }
      >
        <Image
          src={data.logo.src}
          alt={data.logo.alt ?? `${title} logo`}
          fill
          sizes="(max-width: 768px) 50vw, 320px"
          className={styles.logo}
        />
      </span>
      {data.overlays.map((o, i) => (
        <span
          key={i}
          className={styles.box}
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
        >
          <Image
            src={o.src}
            alt={o.alt ?? `${title} screenshot ${i + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 320px"
            className={`${styles.overlay} ${o.shadow ? styles.shadow : ""}`}
            style={o.radius ? { borderRadius: o.radius } : undefined}
          />
        </span>
      ))}
    </div>
  );
}
