let down, origin_x, origin_y, origin_bg_pos_x, origin_bg_pos_y

document.addEventListener('pointerdown', e => {
    down = true
    origin_x = e.clientX
    origin_y = e.clientY
})

document.addEventListener('pointerup', () => {
    down = false
    const style = getComputedStyle(document.body)
    origin_bg_pos_x = parseInt(style.getPropertyValue('background-position-x'))
    origin_bg_pos_y = parseInt(style.getPropertyValue('background-position-y'))
})

document.addEventListener('pointermove', e => {
    if (!down)
        return
    document.body.style.backgroundPositionX = Math.max(0, Math.min((origin_x-e.clientX) / 45 + origin_bg_pos_x, 100)) + '%'
    document.body.style.backgroundPositionY = Math.max(0, Math.min((origin_y-e.clientY) / 25 + origin_bg_pos_y, 100)) + '%'
})

addEventListener('load', () => document.dispatchEvent(new Event('pointerup')))