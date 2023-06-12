export const PreviewModel = (viewerRef, fileSrc) => {
    return <model-viewer
        ref={viewerRef}
        src={fileSrc}
        alt="Model Preview"
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        interaction-prompt="none"
        shadow-intensity="1"
        ar
        autoplay
    // ios-src={URL.createObjectURL(previewFile)}
    > </model-viewer >
}