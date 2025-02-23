const min_radius_px = 20
const vel_thresh = 1e-5
const friction = 1e-3
let down, down_angle, vel, prev_time

function cancel() {
    if (down) {
        down.style.setProperty('--down_cursor', '')
        down = null
    }
}

addEventListener('blur', cancel)

document.addEventListener('pointercancel', cancel)

document.addEventListener('pointerup', e => {
    if (down && !e.button) {
        const time0 = performance.now()
        const spinner = down
        const style = getComputedStyle(spinner)
        const angle0 = +style.getPropertyValue('--angle')
        const vel0 = +style.getPropertyValue('--vel')
        cancel()

        function spin(time) {
            const vel = getComputedStyle(spinner).getPropertyValue('--vel') * Math.exp(-friction*(time-time0))
            if (Math.abs(vel) > vel_thresh) {
                spinner.style.setProperty('--angle', (angle0+(vel0-vel)/friction) % 1)
                requestAnimationFrame(spin)
            }
        }

        requestAnimationFrame(spin)
    }
})

function get_polar(pointer_x, pointer_y, elem) {
    const rect = elem.getBoundingClientRect()
    const center_x = rect.left + rect.width/2
    const center_y = rect.top + rect.height/2
    const delta_x = pointer_x - center_x
    const delta_y = pointer_y - center_y
    const r2 = delta_x**2 + delta_y**2
    const R2 = Math.min(rect.width, rect.height)**2 / 4
    if (r2 <= R2 && r2 > min_radius_px)
        return Math.atan2(delta_y, delta_x) / 2 / Math.PI
    return null
}

const spins = document.querySelectorAll('.spin')

spins.forEach(elem => elem.addEventListener('pointerdown', e => {
    e.preventDefault()
    if (!e.button) {
        down_angle = get_polar(e.clientX, e.clientY, elem)
        if (down_angle != null) {
            down = elem
            down.style.setProperty('--down_cursor', 'grabbing')
            down_angle -= getComputedStyle(down).getPropertyValue('--angle')
            down.style.setProperty('--vel', 0)
        }
    }
}))

addEventListener('focus', () => document.dispatchEvent(new PointerEvent('pointermove')))

document.addEventListener('pointermove', e => {
    if (!down) {
        for (const spin of spins)
            spin.style.setProperty('--cursor', get_polar(e.clientX, e.clientY, spin) == null ? '' : 'grab')
        return
    }
    const new_angle = get_polar(e.clientX, e.clientY, down)
    if (new_angle == null) {
        down.style.setProperty('--down_cursor', '')
        down.style.setProperty('--cursor', '')
        down_angle = null
    } else {
        down.style.setProperty('--down_cursor', 'grabbing')
        down.style.setProperty('--cursor', 'grab')
        const angle = getComputedStyle(down).getPropertyValue('--angle')
        const new_time = performance.now()
        if (down_angle == null) {
            down_angle = new_angle - angle
            down.style.setProperty('--vel', 0)
        } else {
            const dt = new_time - prev_time
            if (dt)
                down.style.setProperty('--vel', (new_angle-down_angle-angle) / dt)
            down.style.setProperty('--angle', (new_angle-down_angle) % 1)
        }
        prev_time = new_time
    }
})