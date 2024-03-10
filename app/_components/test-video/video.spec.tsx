import { staticPath } from "@/lib/$path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Video", () => {
	it("video要素が取得できる", () => {
		render(
			// biome-ignore lint/a11y/useMediaCaption:
			<video
				src={staticPath.test_video.video_mp4}
				controls
				aria-label="The Video"
			/>,
		);
		expect(screen.getByLabelText("The Video")).toBeInTheDocument();
	});
	it("動画が再生できる", async () => {
		const handlePlay = jest.fn();
		render(
			// biome-ignore lint/a11y/useMediaCaption:
			<video
				src={staticPath.test_video.video_mp4}
				controls
				aria-label="The Video"
				onPlay={handlePlay}
			/>,
		);
		const video = screen.getByLabelText<HTMLVideoElement>("The Video");
		await video.play();
		expect(handlePlay).toHaveBeenCalled();
	});

	it("動画をシークできる", async () => {
		const handleSeeked = jest.fn();
		const handleSeeking = jest.fn();
		render(
			// biome-ignore lint/a11y/useMediaCaption:
			<video
				src={staticPath.test_video.video_mp4}
				controls
				aria-label="The Video"
				onSeeked={handleSeeked}
				onSeeking={handleSeeking}
			/>,
		);
		const video = screen.getByLabelText<HTMLVideoElement>("The Video");
		expect(video.currentTime).toBe(0);
		video.currentTime = 10;
		expect(handleSeeked).toHaveBeenCalled();
		expect(handleSeeking).toHaveBeenCalled();
		expect(video.currentTime).toBe(10);
	});
	it("動画の再生が終わる", async () => {
		const handleEnded = jest.fn();
		render(
			// biome-ignore lint/a11y/useMediaCaption:
			<video
				src={staticPath.test_video.video_mp4}
				controls
				aria-label="The Video"
				onEnded={handleEnded}
			/>,
		);
		const video = screen.getByLabelText<HTMLVideoElement>("The Video");
		fireEvent(video, new Event("ended"));
		expect(handleEnded).toHaveBeenCalled();
	});
	it("すべてのテストでvideo要素のモックを適用する", async () => {
		jest.useFakeTimers({
			advanceTimers: true,
		});
		const handleEnded = jest.fn();
		render(
			// biome-ignore lint/a11y/useMediaCaption:
			<video
				src={staticPath.test_video.video_mp4}
				controls
				aria-label="The Video"
				onEnded={handleEnded}
			/>,
		);
		const video = screen.getByLabelText<HTMLVideoElement>("The Video");
		video.play();
		await waitFor(
			() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(true);
					}, 11 * 1000);
				});
			},
			{
				timeout: 12 * 1000,
			},
		);
		expect(handleEnded).toHaveBeenCalled();
	});
});
