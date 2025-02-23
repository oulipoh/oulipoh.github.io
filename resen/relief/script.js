function fix_scene(mv, dx) {  // See: https://github.com/google/model-viewer/issues/4993
    const scene = mv[Object.getOwnPropertySymbols(mv).find(e => e.description == 'scene')]
    scene.toneMapping = 0  // See: https://github.com/google/model-viewer/issues/4541

    new ResizeObserver(() => {
        scene.camera.filmOffset = scene.camera.getFilmWidth() * dx
        mv.zoom(.001 * Math.sign(mv.zoomSensitivity))  // Trigger a view update without resetting the framing. Requires zoom to not be disabled and not be at maximum zoom-in
    }).observe(mv)
}