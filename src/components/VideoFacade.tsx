"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import styles from "./VideoFacade.module.css";

interface VideoFacadeProps {
  videoId: string;
  title: string;
  poster: string;
}

export default function VideoFacade({ videoId, title, poster }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.frame}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.posterButton}
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className={styles.poster}
          />
          <span className={styles.playButton} aria-hidden="true">
            <Play fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
