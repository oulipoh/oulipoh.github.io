let down = false
let bg_pos_dx, bg_pos_dy, last_dx, last_dy
bg_pos_dx = bg_pos_dy = last_dx = last_dy = 0
let origin_x, origin_y

document.addEventListener('pointerdown', e => {
    down = true
    document.body.style.setProperty('--opacity', .07)
    origin_x = e.clientX
    origin_y = e.clientY
    bg_pos_dx += last_dx
    bg_pos_dy += last_dy
})

document.addEventListener('pointerup', () => {
    down = false
    document.body.style.setProperty('--opacity', 1)
})

document.addEventListener('pointercancel', () => {
    down = false
    document.body.style.setProperty('--opacity', 1)
})

document.addEventListener('pointermove', e => {
    if (!down)
        return
    last_dx = e.clientX - origin_x
    last_dy = e.clientY - origin_y
    document.body.style.setProperty('--dx', bg_pos_dx + last_dx)
    document.body.style.setProperty('--dy', bg_pos_dy + last_dy)
})