let down = false
let bg_pos_dx, bg_pos_dy, last_dx, last_dy
bg_pos_dx = bg_pos_dy = last_dx = last_dy = 0
let origin_x, origin_y

addEventListener('blur', () => down = false)

document.addEventListener('pointercancel', () => down = false)

document.addEventListener('pointerup', e => {if (!e.button) down = false})

document.addEventListener('pointerdown', e => {
    if (!e.button) {
        down = true
        origin_x = e.clientX
        origin_y = e.clientY
        bg_pos_dx += last_dx
        bg_pos_dy += last_dy
    }
})

document.addEventListener('pointermove', e => {
    if (!down)
        return
    last_dx = e.clientX - origin_x
    last_dy = e.clientY - origin_y
    document.body.style.setProperty('--dx', bg_pos_dx + last_dx)
    document.body.style.setProperty('--dy', bg_pos_dy + last_dy)
})