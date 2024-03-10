import { staticPath } from "@/lib/$path";
import { FC, useRef } from "react";

export const Video: FC<{
	onPlay?: () => void;
	onSeeked?: () => void;
	onSeeking?: () => void;
}> = ({ onPlay, onSeeked, onSeeking }) => {
	const ref = useRef<HTMLVideoElement>(null);
	return (
		// biome-ignore lint/a11y/useMediaCaption:
		<video
			ref={ref}
			src={staticPath.test_video.video_mp4}
			controls
			aria-label="The Video"
			onPlay={onPlay}
			onSeeked={onSeeked}
			onSeeking={onSeeking}
		/>
	);
};
