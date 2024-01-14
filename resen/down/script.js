const aspect_ratio = 2048 / 1285
let down = false, origin_x, origin_y, bg_pos_pct_x, bg_pos_pct_y, bg_size_diff

document.addEventListener('pointerdown', e => {
    down = true
    origin_x = e.clientX
    origin_y = e.clientY
    const style = getComputedStyle(document.body)
    bg_pos_pct_x = parseFloat(style.backgroundPositionX)
    bg_pos_pct_y = parseFloat(style.backgroundPositionY)
    bg_size_factor = parseFloat(style.backgroundSize)/100
})

document.addEventListener('pointerup', () => {
    down = false
})

document.addEventListener('pointercancel', () => {
    down = false
})

document.addEventListener('pointermove', e => {
    if (!down)
        return

    let dx = origin_x - e.clientX
    if (dx)
        dx *= 100 / (bg_size_factor-1) / innerWidth
    let dy = origin_y - e.clientY
    if (dy)
        dy *= 100 / (bg_size_factor*innerWidth/aspect_ratio-innerHeight)
    document.body.style.backgroundPositionX = Math.max(0, Math.min(bg_pos_pct_x + dx, 100)) + '%'
    document.body.style.backgroundPositionY = Math.max(0, Math.min(bg_pos_pct_y + dy, 100)) + '%'
    // Note: not doing this in CSS due to bug in Firefox. See: https://bugzilla.mozilla.org/show_bug.cgi?id=1874606
})