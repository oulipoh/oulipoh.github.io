let down = false
let bg_pos_dx, bg_pos_dy, last_dx, last_dy
bg_pos_dx = bg_pos_dy = last_dx = last_dy = 0
let origin_x, origin_y

addEventListener('blur', () => down = false)

addEventListener('pointerup', () => down = false)

addEventListener('pointerdown', event => {
    down = true
    origin_x = event.x
    origin_y = event.y
    bg_pos_dx += last_dx
    bg_pos_dy += last_dy
})

addEventListener('pointermove', event => {
    if (!down)
        return
    last_dx = event.x - origin_x
    last_dy = event.y - origin_y
    document.body.style.setProperty('--dx', bg_pos_dx + last_dx)
    document.body.style.setProperty('--dy', bg_pos_dy + last_dy)
})