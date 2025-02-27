function fix_scene(mv, dx) {  // See: https://github.com/google/model-viewer/issues/4993
    const scene = mv[Object.getOwnPropertySymbols(mv).find(e => e.description == 'scene')]
    scene.toneMapping = 0  // See: https://github.com/google/model-viewer/issues/4541

    const ztarget = mv.getCameraTarget().z
    const factor = 1.33 / (parseFloat(mv.minCameraOrbit.split(' ').pop())+ztarget)

    mv.addEventListener('camera-change', event => {
        if (event.detail.source == 'user-interaction')
            mv.cameraTarget = `${(ztarget+mv.getCameraOrbit().radius) * factor}m 0m ${ztarget}m`
    })

    new ResizeObserver(() => {
        scene.camera.filmOffset = scene.camera.getFilmWidth() * dx
        mv.zoom(.001 * Math.sign(mv.zoomSensitivity))  // Trigger a view update without resetting the framing. Requires zoom to not be disabled and not be at maximum zoom-in
    }).observe(mv)
}